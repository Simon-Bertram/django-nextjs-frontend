"use client";
// -> url -> /login

const LOGIN_URL = "http://localhost:8001/api/token/pair";

export default function Page() {
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event, event.target);
    const formData = new FormData(event.target);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    const response = await fetch(LOGIN_URL, requestOptions);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      console.log("Logged in");
    }
  }

  return (
    <div className="h-[95vh]">
      <div className="max-w-md mx-auto py-5">
        <h1>Login here</h1>
        <form action="" onSubmit={handleSubmit} className="py-5">
          <legend>Login</legend>
          <fieldset>
            <div className="flex items-center mb-3">
              <label htmlFor="username">Username:</label>
              <div className="ml-2">
                <input
                  className="p-1"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Your username"
                  required
                />
              </div>
            </div>
            <div className="flex items-center mb-3">
              <label htmlFor="password">Password</label>
              <div className="ml-4">
                <input
                  className="p-1"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  required
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="border-purple-400 px-3 py-1 rounded-md border hover:bg-white hover:text-black"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
