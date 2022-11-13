import React from "react";
import { useState, useEffect } from "react";
import Postentry from "./postentry";


export default function Dashboard(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/listPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setList(res);
      });
  }, []);

  return (
    <div class="container">
      <main>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <a
              class="nav-link"
              id="navUsername"
              aria-current="page"
              href="./profile.html"
              >Welcome!</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="linkLogout" href="/logout">Log Out</a>
          </li>
        </ul>
        <div class="mt-4 mb-4 d-flex justify-content-between">
          <div class="h1">Welcome to NEU Align Career!</div>
          <div>
          <button
            class="btn btn-primary me-md-2 justify-content-md-end"
            id="newpost"
            type="button"
          >
            Share my experience
          </button>
          </div>
        </div>
        <div id="content"></div>
        <div id="list" class="list-group">
          {list.map((i, index) => (
            <Postentry
              author={i.author}
              title={i.title}
              content={i.content}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

async function getUsername() {
  const res = await fetch("/api/user");
  if (res.status === 200) {
    const users = await res.json();
    const username = await users.username;
    return username;
  }
}
