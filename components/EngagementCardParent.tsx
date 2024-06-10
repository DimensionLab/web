import EngagementCard from "./EngagementCard";
import TryPlatformButton from "./TryPlatformButton";

const EngagementCardsParent = () => {
  const data = [
    {
      title: "Join our community Discord server!",
      subtitle: "We are giving out free 1 month discounts to early adopters - ask around in our community Discord!",
      cta: "JOIN OUR DISCORD",
      href: "https://discord.gg/UxQyC9PEqt",
      bgColor: "variable"
    },
  ];

  return (
    <section className="w-full flex flex-col justify-center items-center text-center">
      <main className="w-full flex flex-col md:flex-row py-4 gap-y-4 h-full max-md:max-w-lg md:grid-cols-2 gap-x-4 lg:gap-x-8 max-w-5xl">
        {data.map((item, index) => {
          return (
            <EngagementCard
              title={item.title}
              subtitle={item.subtitle}
              buttonText={item.cta}
              buttonHref={item.href}
              bgColor={item.bgColor}
              key={index}
            />
          );
        })}
      </main>
      <div className="mx-auto mt-16">
        <TryPlatformButton />
      </div>
    </section>
  );
};

export default EngagementCardsParent;
