import Card from "./Card";

const Recommend = ({ type }) => {
  const data = [
    { _id: 123454, title: "Album1", name: "Artiste1" },
    { _id: 123454, title: "Album2", name: "Artiste2" },
    { _id: 123454, title: "Album2", name: "Artiste2" },
    { _id: 123454, title: "Album2", name: "Artiste2" },
    { _id: 123454, title: "Album2", name: "Artiste2" },
    { _id: 123454, title: "Album2", name: "Artiste2" },
    { _id: 123454, title: "Album2", name: "Artiste2" },
    { _id: 123454, title: "Album2", name: "Artiste2" },
    { _id: 123454, title: "Album2", name: "Artiste2" },
    { _id: 123454, title: "Album2", name: "Artiste2" },
  ];
  return (
    <section className="text-gray-200 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Recommended {type[0].toUpperCase() + type.slice(1)}
      </h2>
      <article className="flex overflow-x-auto gap-8">
        {data.map((item) => (
          <Card
            key={item._id}
            title={item.title}
            coverImage={item.coverImage}
            name={item.name}
          />
        ))}
      </article>
    </section>
  );
};

export default Recommend;
