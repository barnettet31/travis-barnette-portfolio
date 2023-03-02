/* eslint-disable react/no-unescaped-entities */
import { getPublicLayout } from "../components/publicLayout/publicLayout.component";
import { type NextPageWithLayout } from "./_app";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "../components/socialIcons/socialIcons.component";
import { SocialLink } from "../components/socialLink/socialLink.component";

import { Container } from "../components/container/container.component";
import Image from "next/image";
import { MailIcon } from "~/components/icons/icons.components";
const AboutPage: NextPageWithLayout = () => {
  return (
    <div className="mt-8">
      <Container>
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src="/profile.jpg"
                alt=""
                width={1920}
                height={1080}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              My name is Travis Barnette. I live in the Shenandoah valley, where
              I enjoy the quiet life.
            </h1>
            <div className="mt-6 space-y-7 text-base lg:text-xl text-zinc-600 dark:text-zinc-400">
              <p>
                I've enjoyed working on with computers since I was a kid. My
                brother and I were messing with Microsoft paint and we clicked
                on a series of button that got the dreaded "Illegal action"
                notification. My brother ran away because of the cops coming for
                us. I stayed and questoined every second of it.
              </p>
              <p>
                My interest in computers only grew from there when I realized I
                could fully customize MySpace pages by fiddling with some of the
                code (yes I remember myspace). I actually used to sell those
                plug ins to other students, and you would not believe the number
                of requests I would have for a music player that put "Animal I
                have become" by Three Days Grace on their page. That interest
                only continues in my career today as I am a full stack developer
                with a focus on front end development.
              </p>
              <p>
                Other than coding, I have a passion for EMS, D&D, and hiking. I
                am a certified EMT-B currently and I volunteered through my
                local agency for a couple of years. I am also a Dungeon Master
                for a D&D group and regularly create custom made campaigns for
                my players. If I'm not coding or playing D&D, you can find me
                hiking with my parent's dog (I can't have one in my current
                apartment) or friends. I love the outdoors and I try to get out
                as much as I can.
              </p>
             
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://twitter.com/TravCodez"
                icon={TwitterIcon}
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/travcodez/"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/barnettet31"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/barnettetravis31/"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:barnette.travis31@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                barnette.travis31@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

AboutPage.getLayout = getPublicLayout;

export default AboutPage;
