import DOMPurify from "dompurify";

const Lyrics = ({ lyrics }) => {
  const sanitizedHTML = DOMPurify.sanitize(lyrics);

  return (
    <section className="mt-6">
      <h1 className="text-xl md:text-2xl mb-4 md:font-semibold">Lyrics</h1>
      {lyrics ? (
        <article dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      ) : (
        <p className="italic">No Lyrics yet for this song</p>
      )}
    </section>
  );
};

export default Lyrics;
