import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function InputUser() {
  const [formData, setFormData] = React.useState({
    link: "",
  });
  const [shortLink, setShortLink] = React.useState("");
  const { link } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(link);
    // send link to bitly

    try {
      await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_BITLY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: link,
          domain: "bit.ly",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setShortLink(data.link);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="tex-center">
      <h1 className="text-3xl font-bold mb-5">Shorten your link</h1>
      <form onSubmit={onSubmit}>
        <input
          type="link"
          placeholder="Enter your link to shorten "
          id="link"
          name="link"
          value={link}
          onChange={onChange}
          className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3"
        />
        <button
          className="bg-blue-500 text-white px-8 py-3 ml-4 rounded-md"
          type="submit"
        >
          Shorten
        </button>
      </form>
      <div className="mt-5">
        <p className="mb-5 text-lg font-medium">Shortened Link: </p>
        {shortLink}
        <CopyToClipboard text={shortLink}>
          <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
            Copy URL to Clipboard
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
