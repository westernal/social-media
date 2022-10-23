import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import API from "../../requests/API";
import { useEffect } from "react";

const Footer = () => {
  const [notificationCount, SetNotificationCount] = useState(0);
  let token;
  const [jwt, Setjwt] = useState({ username: "" });

  const getCount = async (userId) => {
    console.log(userId);
    const option = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(option, `api/users/notification/${userId}`);
    console.log(result);

    if (result.status == 200) {
      SetNotificationCount(result.data.notifications);
    }
  };

  useEffect(() => {
    token = localStorage.getItem("token");
    Setjwt(jwt_decode(token));
    getCount(jwt_decode(token).userId);
  }, []);

  const clearNotification = async () => {
    const option = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };

    var result = await API(
      option,
      `api/users/notification/clear/${jwt.userId}`
    );

    SetNotificationCount(0);
  };

  return (
    <div className="footer">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
      </Head>
      <Link href="/home">
        <a aria-label="home">
          <Image
            width={28}
            height={28}
            src="/Images/home.png"
            alt="home"
            id="home-icon"
          />
        </a>
      </Link>

      <Link href="/search">
        <a aria-label="search">
          <Image
            width={28}
            height={28}
            src="/Images/search.svg"
            alt="search"
            id="search-icon"
          />
        </a>
      </Link>

      <Link href="/notifications">
        <a aria-label="notification" onClick={clearNotification}>
          <div className="notification-icon">
            <Image
              width={25}
              height={25}
              src="/Images/notification.svg"
              alt="notification"
              id="notif-icon"
            />
            {notificationCount != 0 && (
              <div className="new-notif flex">{notificationCount}</div>
            )}
          </div>
        </a>
      </Link>

      <Link href={`/${jwt.username}`}>
        <a aria-label="profile">
          <Image
            width={33}
            height={33}
            src="/Images/user.svg"
            alt="profile"
            id="user-icon"
          />
        </a>
      </Link>
    </div>
  );
};

export default Footer;
