import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Cookies from "universal-cookie/es6";

const cookies = new Cookies();

const Accesorio = ({id, tipo}) => {
  //   const handleSelection = async (e) => {
  //     console.log(e.target);
  //     console.log(e.target.alt);
  //     // cookies.set("body", e.target.alt, { path: "/" });
  //     const url = API_HOST + "avatar/";

  //     await axios
  //       .put(
  //         url,
  //         {
  //           id: cookies.get("avatarId"),
  //           name: "lalala",
  //           body: e.target.alt,
  //           glasses: cookies.get("glasses"),
  //           hat: cookies.get("hat"),
  //           clothes: cookies.get("clothes"),
  //         },
  //         {
  //           headers: {
  //             Authorization: cookies.get("token"),
  //           },
  //         }
  //       )
  //       .catch((error) => {
  //         console.log(error);
  //         alert("ERRORRRR2");
  //       });

  //     cookies.set("body", e.target.alt, { path: "/" });
  //     window.location.href = "AlumnoPerfil";
  //     // e.target.setAttribute("src", "https://source.unsplash.com/LYK3ksSQyeo");
  //     // e.target.setAttribute("alt", "dog");
  //   };

  return (
    // <div className="card ms-3 mt-2" style={{ maxWidth: 120 }}>
    //   <div className="row no-gutters">
    //     <div className="d-flex flex-column align-items-center text-center">
    
    <div>
      <img
        src={`/accesorios/${id}.png`}
        alt={id}
        // className="card-img img"
        width="50"
      />
    </div>
    //      </div>
    //   </div>
    // </div>
  );
};

export default Accesorio;