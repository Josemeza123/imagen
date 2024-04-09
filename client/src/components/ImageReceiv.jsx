import { useEffect, useState } from "react";

const ImageReceiv = () => {
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/image/get")
      .then((res) => res.json())
      .then((res) => setImageList(res))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {imageList.map((image) => (
        <div key={image}>
          <img src={"http://localhost:9000/" + image} alt="..." />
        </div>
      ))}
    </div>
  );
};

export default ImageReceiv;
