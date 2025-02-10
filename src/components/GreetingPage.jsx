function GreetingPage() {
  return (
    <>
      <h2>Welcome to Laura's Library!</h2>
      <div className="greeting_paragraphs">
        <p>This Library contains a small collection of books that can be viewed by anyone and can be checked out by logged in users. </p>
        <p>Users without an account can register for one. Once users are logged in, they can checkout and return books and can review their account info.</p>
        <p>This site demonstrate's Laura's knowledge of react. Feel free to view the source code here: <a href="https://github.com/LauraMFerrisNY/BookBuddy">View Source Code</a>.</p>
      </div>
    </>
  )
}
export default GreetingPage