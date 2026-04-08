import { SoundButton } from "@/components/SoundButton";

export default function Home() {
  return (
    <div className="landing-container" style={{ margin: '0 auto' }}>
      <div className="title-container">
        <h1 className="main-title">This is,<br /><strong>Christian Gleitzman</strong></h1>
        <h2 className="sub-title">Computer Science Student</h2>
      </div>
      <div className="button-container">
        <SoundButton href="/about" text="About Me" soundFile="btnHov" />
        <SoundButton href="/projects" text="My Projects" soundFile="btnHov" />
        <SoundButton href="/contact" text="Contact Me" soundFile="btnHov" />
      </div>
    </div>
  );
}