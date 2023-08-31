Hello，大家好！

![1692350752127](image/Promise.all/1692350752127.png)

Javascrript 中 Promise 是一个非常强大的 api，帮助我们处理异步操作。

Promise.all 作为能够聚合一些列 promises 将异步操作带到了一个新的高度。

换句话说，我们可以说 Promise.all 帮助我们进行并发操作。

## **预备知识：**

我们必须首先了解 Javascript 中 **「Promise」** 是什么？

## **什么是 Promise.all**

Promise.all 实际上是一个函数，它接受一个 promises 数组并返回一个 Promise。然后当所有的 promises 都完成时会得到 resolve 或者当其中一个被拒绝时会得到 rejected。

例如：假设有十个 promises（执行网络请求或数据库操作），必须知道所有的 promises 何时得到解决，或者必须等到所有的 promises 得到解决。所以，我们可以将十个 promises 传入 Promise.all 中，然后当十个 promises 都被完成或当十个 promises 中任何一个发生错误 Promise.all 会得到一个 resolved 或者 rejected.

**「让我们看看代码：」**

```text
Promise.all([Promise1, Promise2, Promise3])
 .then(result) => {
   console.log(result)
 })
 .catch(error => console.log(`Error in promises ${error}`))
```

可以看到，我们像 Promise.all 传入了一个数组，当数组中的三个 promises 都完成时，Promise.all 才能完成并输出 `console` 中内容。

**「让我看看例子：」**

```text
// A simple promise that resolves after a given time
const timeOut = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Completed in ${t}`)
    }, t)
  })
}

// Resolving a normal promise.
timeOut(1000)
 .then(result => console.log(result)) // Completed in 1000

// Promise.all
Promise.all([timeOut(1000), timeOut(2000)])
 .then(result => console.log(result)) // ["Completed in 1000", "Completed in 2000"]

```

上述例子中，Promise.all 在 2000ms 后完成，并且在控制台输出了一个数组。

有趣的是 Promise.all 接受的数组参数中的 promises 是按照顺序执行的，数组中的第一个 promise 会首先执行，第二个 promise 将会第二个执行，以此类推。

**「看看其他的例子：」**

```text
// A simple promise that resolves after a given time
const timeOut = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Completed in ${t}`)
    }, t)
  })
}

const durations = [1000, 2000, 3000]

const promises = []

durations.map((duration) => {
  // In the below line, two things happen.
  // 1. We are calling the async function (timeout()). So at this point the async function has started and enters the 'pending' state.
  // 2. We are pushing the pending promise to an array.
  promises.push(timeOut(duration)) 
})

console.log(promises) // [ Promise { "pending" }, Promise { "pending" }, Promise { "pending" } ]

// We are passing an array of pending promises to Promise.all
// Promise.all will wait till all the promises get resolves and then the same gets resolved.
Promise.all(promises)
.then(response => console.log(response)) // ["Completed in 1000", "Completed in 2000", "Completed in 3000"]
```

从上面的例子可以很明显的看出，Promise.all 一直能到所有的 promises 都完成为止。

让我们看看如果一个 promise 没完成会发生什么：

```text
// A simple promise that resolves after a given time
const timeOut = (t) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (t === 2000) {
        reject(`Rejected in ${t}`)
      } else {
        resolve(`Completed in ${t}`)
      }
    }, t)
  })
}

const durations = [1000, 2000, 3000]

const promises = []

durations.map((duration) => {
  promises.push(timeOut(duration)) 
})

// We are passing an array of pending promises to Promise.all
Promise.all(promises)
.then(response => console.log(response)) // Promise.all cannot be resolved, as one of the promises passed got rejected.
.catch(error => console.log(`Error in executing ${error}`)) // Promise.all throws an error.
```

我们可以看到，如果 promises 中一个失败了的话，那么所有其他的 promises 也会失败，然后 Promise.all 会得到 rejected。

在某些情况下，我们需要所有的 promises 即使在某个失败了，我们也能稍后处理失败的 promises。

让我们看看如何处理它：

```text
const durations = [1000, 2000, 3000]

promises = durations.map((duration) => {
  return timeOut(duration).catch(e => e) // Handling the error for each promise.
})

Promise.all(promises)
  .then(response => console.log(response)) // ["Completed in 1000", "Rejected in 2000", "Completed in 3000"]
  .catch(error => console.log(`Error in executing ${error}`))
```

## **Promise.all 应用实例**

加入要执行大量的异步操作，如向上千万的用户发送营销电子邮件。

简单的伪代码如下：

```text
for (let i=0;i<50000; i += 1) {
 sendMailForUser(user[i]) // Async operation to send a email
}
```

上述的例子很简单，但是效果却不是很好。如此运行代码，会使得在某个时间点，堆栈变得沉重。Javascript 将有大量的 HTTP 链接，这可能会导致服务器宕机。

很简单的完成上述任务，我们可以分批次执行，先发送给 500 个用户，然后等待完成后在执行后续操作。

让我们看看代码：

```text
// Async function to send mail to a list of users.
const sendMailForUsers = async (users) => {
  const usersLength = users.length
  
  for (let i = 0; i < usersLength; i += 100) { 
    const requests = users.slice(i, i + 100).map((user) => { // The batch size is 100. We are processing in a set of 100 users.
      return triggerMailForUser(user) // Async function to send the mail.
       .catch(e => console.log(`Error in sending email for ${user} - ${e}`)) // Catch the error if something goes wrong. So that it won't block the loop.
    })
  
    // requests will have 100 or less pending promises. 
    // Promise.all will wait till all the promises got resolves and then take the next 100.
    await Promise.all(requests)
     .catch(e => console.log(`Error in sending email for the batch ${i} - ${e}`)) // Catch the error.
  }
}


sendMailForUsers(userLists)
```

另一种应用场景是：当我们不得不构建一个从多个第三方获取信息并汇总来自这些 API 的响应的 API 时，Promise.all 是一个完美的方法去解决这个问题。让我们看看如何实现：

```text
// Function to fetch Github info of a user.
const fetchGithubInfo = async (url) => {
  console.log(`Fetching ${url}`)
  const githubInfo = await axios(url) // API call to get user info from Github.
  return {
    name: githubInfo.data.name,
    bio: githubInfo.data.bio,
    repos: githubInfo.data.public_repos
  }
}

// Iterates all users and returns their Github info.
const fetchUserInfo = async (names) => {
  const requests = names.map((name) => {
    const url = `https://api.github.com/users/${name}`
    return fetchGithubInfo(url) // Async function that fetches the user info.
     .then((a) => {
      return a // Returns the user info.
      })
  })
  return Promise.all(requests) // Waiting for all the requests to get resolved.
}


fetchUserInfo(['sindresorhus', 'yyx990803', 'gaearon'])
 .then(a => console.log(JSON.stringify(a)))

/*
Output:
[{
  "name": "Sindre Sorhus",
  "bio": "Full-Time Open-Sourcerer ·· Maker ·· Into Swift and Node.js ",
  "repos": 996
}, {
  "name": "Evan You",
  "bio": "Creator of @vuejs, previously @meteor & @google",
  "repos": 151
}, {
  "name": "Dan Abramov",
  "bio": "Working on @reactjs. Co-author of Redux and Create React App. Building tools for humans.",
  "repos": 232
}]
*/
```

## **结束语**

Promise.all 是将一组 promises 聚合的最佳实现方式。这是在 javascript 中实现并发的一种方法。

希望你能喜欢这片文章！

那么，拜拜了，下次见。886

![1692350772235](image/Promise.all/1692350772235.png)
