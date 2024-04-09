import { useState } from "react";

const ImageData = () => {
  const [file, setFile] = useState(null);
  const selectedHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const sendHandler = () => {
    if (!file) {
      alert("debes cargar un archivo");
      return;
    }
    const formdata = new FormData();
    formdata.append("image", file);
    fetch("http://localhost:9000/image/post", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
      });
    document.getElementById("fileinput").value = null;
    setFile(null);
  };
  return (
    <>
      <nav>
        <div>
          <a href="#">Image app</a>
        </div>
      </nav>

      <div>
        <div>
          <input id="fileinput" onChange={selectedHandler} type="file" />
          <button onClick={sendHandler}>upload</button>
        </div>
      </div>
    </>
  );
};

export default ImageData;
