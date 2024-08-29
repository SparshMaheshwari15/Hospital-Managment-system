import Biography from "../components/Biography";
import Department from "../components/Department";
import Hero from "../components/Hero";
import MessageForm from "../components/MessageForm";

export default function Home() {
    return (
        <>
            <Hero
                title={"Welcome to ZeeCare | Your Trusted Healthcare"}
                imageUrl={"/hero.png"}
            />
            <Biography imageUrl={"/about.png"} />
            <Department  />
            <MessageForm />
        </>
    );
}
