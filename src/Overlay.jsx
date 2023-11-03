import { useState } from "react";

import { Logo } from "@pmndrs/branding";
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { useSnapshot } from "valtio";

import { state } from "./store";
import { motion, AnimatePresence } from "framer-motion";

import ImageUploading from 'react-images-uploading';


export default function Overlay() {
  const snap = useSnapshot(state);

  const transition = { type: "spring", duration: 0.8 };

  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
  };



  return (
    <div className="container">
      <motion.header
        initial={{ opacity: 0, y: -120 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 1.8, delay: 1 }}
      >
        <Logo width="40" height="40" />
        <ShoppingCartIcon />
      </motion.header>

      <AnimatePresence>
        {snap.intro ? (
          <Intro key="main" config={config} />
        ) : (
          <Customizer key="custom" config={config} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ShoppingCartIcon() {
  return (
    <div>
      <AiOutlineShopping size="3em" />
    </div>
  );
}

function Intro({ config }) {
  return (
    <motion.section {...config} key="main">
      <div className="section--container">
        <div>
          <h1>LET'S DO IT.</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>
            <button
              style={{ background: "black" }}
              onClick={() => (state.intro = false)}
            >
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// function Intro() {
//   return (
//     <section key="main">
//       <div className="section--container">
//         <h1>LET'S DO IT.</h1>
//         <SupportContent />
//       </div>
//     </section>
//   );
// }

// function SupportContent() {
//   return (
//     <div className="support--content">
//       <p>
//         Create your unique and exclusive shirt with our brand-new 3D
//         customization tool. <strong>Unleash your imagination</strong> and define
//         your own style.
//       </p>
//       <CustomizeButton />
//     </div>
//   );
// }

// function CustomizeButton() {
//   return (
//     <button
//       style={{ background: "black" }}
//       onClick={() => (state.intro = false)}
//     >
//       CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
//     </button>
//   );
// }

function Customizer({ config }) {
  const snap = useSnapshot(state);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [newImgIsLoading, setNewImgIsLoading] = useState(true);
  const maxNumber = 69;


  const addImagesToDecals = (images) => {

    const newDecals = [...snap.decals];
    images.forEach((image) => {
      // Extrait le type MIME (par exemple, 'image/png') à partir de la chaîne base64
      const mime = image['data_url'].split(':')[1].split(';')[0];

      // Génère un nom de fichier unique en utilisant l'horodatage actuel et un identifiant unique
      let uniqueFilename = Date.now() + '_' + Math.random().toString(36).substring(7);

      fetch('http://localhost:3003/api/save-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64Data: image['data_url'], filename: uniqueFilename }),
      })
        .then(response => response.text())
        .then(result => {
          // setNewImgIsLoading(true)
          uniqueFilename = 'upload/' + uniqueFilename
          state.selectedDecal = uniqueFilename
          newDecals.push(uniqueFilename);
          state.decals = newDecals;
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    state.selectedSize = selectedSize; // Mettre à jour la taille sélectionnée dans l'état global
  };


  const onChange = (imageList, addUpdateIndex) => {
    // Mettez à jour la liste d'images
    // setImages(imageList);
    addImagesToDecals(imageList);
    setNewImgIsLoading(false);
  };

  return (
    <motion.section {...config} key="custom">
      <div className="customizer">
        <div className="color-options">
          {snap.colors.map((color) => (
            // console.log(color)
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => (state.selectedColor = color)}
            ></div>
          ))}
        </div>

        <div className="tshirt-size-selector">
          <h3>Choisissez la taille de votre t-shirt :</h3>
          <select
            value={state.selectedSize} // Utilisez state.selectedSize pour la valeur du sélecteur
            onChange={handleSizeChange}
          >
            {snap.sizes.map((size, index) => (
              //console.log(size,index)
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
          {snap.selectedSize && (
            <p>Vous avez choisi la taille : {snap.selectedSize}</p>
          )}
        </div>
        <div className="decals">
          <div className="decals--container">
            {snap.decals.map((decal) => (
              <div
                key={decal}
                className="decal"
                onClick={() => (state.selectedDecal = decal)}
              >
                <img src={decal + "_thumb.png"} alt="brand" />
              </div>
            ))}
          </div>
        </div>

        <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
          {({ onImageUpload, isDragging, dragProps, errors }) => (
            <div>
              {errors && <div>
                {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
                {errors.acceptType && <span>Your selected file type is not allow</span>}
                {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                {errors.resolution && <span>Selected file is not match your desired resolution</span>}
              </div>
              }
              <button
                className="upload"
                style={isDragging ? { background: snap.selectedColor } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                UPLOAD
                <AiFillCamera size="1.3em" />
              </button>
            </div>
          )}
        </ImageUploading>


        <button
          className="exit"
          style={{ background: snap.selectedColor }}
          onClick={() => (state.intro = true)}
        >
          Ajout Panier
          <AiOutlineArrowRight size="1.3em" />
        </button>
      </div>
    </motion.section >
  );
}
