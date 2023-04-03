import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import useSWR from "swr";
import postRequest from "../../functions/requests/postRequest";
import getRequest from "../../functions/requests/getRequest";
import decodeJWT from "../../functions/decodeJWT";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Footer = () => {
  const [token, SetToken] = useState({ username: "" });
  const userId = token.userId;
  const { data: result, isLoading } = useSWR(
    `api/users/notification/${userId}`,
    (url) => getRequest(url, true)
  );

  useEffect(() => {
    const decodedToken = decodeJWT(getCookie("cookieToken").toString());
    SetToken(decodedToken);
  }, []);

  const clearNotification = async () => {
    await postRequest({}, `api/users/notification/clear/${userId}`, true);
  };

  return (
    <footer className="footer">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
      </Head>
      <Link href="/home/timeline">
        <Image
          width={28}
          height={28}
          src="/Images/home.png"
          alt="home"
          id="home-icon"
        />
      </Link>

      <Link href="/user/search">
        <Image
          width={28}
          height={28}
          src="/Images/search.svg"
          alt="search"
          id="search-icon"
        />
      </Link>

      <Link href="/user/notifications" onClick={clearNotification}>
        <div className="notification-icon">
          <Image
            width={25}
            height={25}
            src="/Images/notification.svg"
            alt="notification"
            id="notif-icon"
          />
          {result &&
          result.data.notifications &&
          result?.data?.notifications != 0 ? (
            <div className="new-notif flex">{result?.data?.notifications}</div>
          ) : null}
        </div>
      </Link>

      <Link href={`/${token.username}`}>
        <Image
          width={33}
          height={33}
          src="/Images/user.svg"
          alt="profile"
          id="user-icon"
        />
      </Link>
    </footer>
  );
};

export default Footer;
