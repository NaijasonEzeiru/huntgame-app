"use client";
import { usePathname } from "next/navigation";

const AboutApp = () => {
  const pathname = usePathname();
  console.log({ pathname });
  if (pathname == "/download") {
    return (
      <>
        <div className="bg-white px-6 pt-8 space-y-5 md:space-y-8 sm:px-7 lg:px-[186px] md:text-[1.375rem] md:font-medium">
          <h4 className="text-lg md:text-2xl font-extrabold ">
            About this app
          </h4>
          <p>
            Welcome to HuntGame, your ultimate dating and relationship
            companion!
          </p>
          <p>
            Ready to level up your love life? HuntGame is here to make your
            journey to finding meaningful connections and fostering lasting
            relationships an exhilarating adventure.
          </p>
          <div>
            <h4 className="">Explore, Connect, Thrive:</h4>
            <p>
              Embark on a captivating journey where every swipe brings you
              closer to your perfect match. With our intuitive interface,
              effortlessly navigate through profiles, engage in meaningful
              conversations, and discover individuals who share your interests,
              values, and passions.
            </p>
          </div>
          <div>
            <h4 className="">Personalised Matches:</h4>
            <p>
              Leave the matchmaking to us! Our advanced algorithms analyze your
              preferences and behavior to deliver personalized recommendations
              tailored to your unique dating goals. Say goodbye to endless
              scrolling and hello to quality matches that resonate with you.
            </p>
          </div>
          <div>
            <h4 className="">Authentic Profiles:</h4>
            <p>
              Authenticity is key at HuntGame. Rest assured, every profile is
              verified to ensure a safe and genuine dating experience. Say
              goodbye to catfish and hello to real connections with real people.
            </p>
          </div>
          <div>
            <h4 className="">Privacy First:</h4>
            <p>
              Your privacy is our top priority. Feel confident knowing that your
              data is safe and secure with our robust privacy measures. Take
              control of your dating journey and explore the possibilities with
              peace of mind.
            </p>
          </div>
          <p>
            Join the HuntGame community today and embark on a journey filled
            with excitement, possibility, and endless opportunities for love and
            connection. Your next adventure awaits!
          </p>
          <p>
            Your personal data is securely stored on Huntgame - be sure to read
            our privacy policy and terms of use:
          </p>
          <div className="flex flex-col">
            <a
              href="https://www.huntgameshow.com/privacy-policy"
              target="_blank"
            >
              https://www.huntgameshow.com/privacy-policy
            </a>
            <a
              href="https://www.huntgameshow.com/end-user-agreement"
              target="_blank"
            >
              https://www.huntgameshow.com/end-user-agreement
            </a>
          </div>
          <div>
            <p className="md:text-[1.375rem] font-bold text-sm mb-1">
              Updated on
            </p>
            <p className="md:text-[1.375rem] font-bold text-sm">Nov 18, 2024</p>
          </div>
          <p className="md:text-[1.375rem] font-bold text-sm">Version 2.4.0</p>
        </div>
        <div className="bg-white px-6 py-5 space-y-5 md:space-y-8 sm:px-7 lg:px-[186px] md:text-[1.375rem] md:font-medium md:py-20">
          <div>
            <h4 className="md:text-2xl font-bold ">What&apos;s new</h4>
            <p>Bug fixes, improved performance.</p>
          </div>
          <div>
            <h4 className="md:text-2xl font-bold ">Data safety</h4>
            <p>
              This app may collect the following information. The developer
              provided this information and may update it over time.
            </p>
            <p>This app may share these data types with third parties</p>
          </div>
          <ul className="list-disc list-inside">
            This app may collect these data types
            <li>You can request that data be deleted</li>
            <li>Data is encrypted in transit</li>
            <li>Location, Personal info, camera permissions</li>
          </ul>
          <div>
            <h4 className="md:text-2xl font-bold md:pt-3">
              Developer Details:
            </h4>
            <p>Huntgames limited.</p>
            <p>+234 916794 8683</p>
            <p>Copyright: Huntgames limited, all rights reserved.</p>
          </div>
          <div className="md:pb-7">
            <h4 className="md:text-2xl font-bold md:pt-3">Privacy policy: </h4>
            <a href="https://huntgameshow.com/privacy-policy/">
              https://huntgameshow.com/privacy-policy/
            </a>
          </div>
        </div>
      </>
    );
  }
};

export default AboutApp;
