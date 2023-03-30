import Footer from "../../components/layout/Footer";
import BackHeader from "../../components/layout/header/BackHeader";
import { useRouter } from "next/router";
import Head from "next/head";
import Logout from "../../components/authentication/Logout";
import SettingForm from "../../components/authentication/form/SettingForm";
import getRequest from "../../functions/requests/getRequest";
import useAuth from "../../hooks/useAuth";

const Setting = ({ user }) => {
  const router = useRouter();
  const render = useAuth(router, true);
  const host = "https://alinavidi.ir/";

  return (
    <>
      <Head>
        <title>Westernal - Setting</title>
      </Head>
      <BackHeader title={"Setting"} />

      {render ? (
        <main className="setting flex">
          <section className="auth-form">
            <SettingForm user={user} image={host + user.image} />
          </section>

          <div className="setting-btns">
            <a href="mailto:support@contact.westernal.net">
              <button className="contact-btn">Contact Support</button>
            </a>
            <Logout />
          </div>
        </main>
      ) : null}

      {render ? <Footer /> : null}
    </>
  );
};

Setting.getInitialProps = async (context) => {
  const username = context.query.username;
  const result = await getRequest(`api/posts/user/${username}`);

  if (result?.status == 404 || !result) {
    return {
      notFound: true,
    };
  }

  return {
    user: result.data.creator,
  };
};

export default Setting;
