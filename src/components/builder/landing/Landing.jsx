"use client";

import React, { useEffect, useState } from "react";
import BuilderLayout from "../BuilderLayout";
import { FaCircle } from "react-icons/fa";
import { FileUpload } from "@/components/global/FileUpload";
import { useUser } from "@clerk/nextjs";
import { ToastAction } from "../../global/Toast";
import { useToast } from "../../global/Use-Toast";
import { IconTrash } from "@tabler/icons-react";

const options = [
  { id: 1, name: "Brand Name" },
  { id: 2, name: "Logo" },
  { id: 3, name: "Primary Image" },
  { id: 4, name: "Other Images" },
  { id: 5, name: "Product Title" },
  { id: 6, name: "Price" },
  { id: 7, name: "Variants" },
  { id: 8, name: "Cart Button" },
];

const FontDropdown = ({ base, handleChange }) => {
  const fonts = [
    { name: "Arial", style: "Arial, sans-serif" },
    { name: "Helvetica", style: "Helvetica, sans-serif" },
    { name: "Georgia", style: "Georgia, serif" },
    { name: "Times New Roman", style: "'Times New Roman', serif" },
    { name: "Courier New", style: "'Courier New', monospace" },
    { name: "Roboto", style: "'Roboto', sans-serif" },
    { name: "Open Sans", style: "'Open Sans', sans-serif" },
    { name: "Lato", style: "'Lato', sans-serif" },
    { name: "Montserrat", style: "'Montserrat', sans-serif" },
    { name: "Poppins", style: "'Poppins', sans-serif" },
    { name: "Oswald", style: "'Oswald', sans-serif" },
    { name: "Quicksand", style: "'Quicksand', sans-serif" },
    { name: "Raleway", style: "'Raleway', sans-serif" },
    { name: "Ubuntu", style: "'Ubuntu', sans-serif" },
    { name: "Merriweather", style: "'Merriweather', serif" },
    { name: "Playfair Display", style: "'Playfair Display', serif" },
    { name: "Baskerville", style: "'Baskerville', serif" },
    { name: "Fira Sans", style: "'Fira Sans', sans-serif" },
    { name: "Source Sans Pro", style: "'Source Sans Pro', sans-serif" },
    { name: "Slabo 27px", style: "'Slabo 27px', serif" },
    { name: "Droid Serif", style: "'Droid Serif', serif" },
    { name: "Verdana", style: "'Verdana', sans-serif" },
    { name: "Tahoma", style: "'Tahoma', sans-serif" },
    { name: "Trebuchet MS", style: "'Trebuchet MS', sans-serif" },
    { name: "Comic Sans MS", style: "'Comic Sans MS', sans-serif" },
    { name: "Impact", style: "'Impact', sans-serif" },
  ];

  const handleFontChange = (event) => {
    handleChange({
      ...base,
      font: event.target.value,
    });
  };

  return (
    <div style={{ fontFamily: base.font || fonts[0].style }}>
      <h2 className="font-dm mb-2 text-black">Font</h2>
      <select
        value={base.font || fonts[0].style}
        onChange={handleFontChange}
        className="w-full px-2 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {fonts.map((font, index) => (
          <option
            key={index}
            value={font.style}
            style={{ fontFamily: fonts[index].style }}
          >
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const TitleComponent = ({ title, handleTitleChange }) => {
  return (
    <div className="w-full font-dm flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <h1>Text</h1>
        <input
          type="text"
          value={title.text || ""}
          placeholder="Enter Text"
          onChange={(e) =>
            handleTitleChange({
              ...title,
              text: e.target.value.slice(0, 100),
            })
          }
          className="border w-full border-gray-300 rounded-lg p-3 text-gray-700"
          maxLength="100"
        />
      </div>
      <div>
        <FontDropdown base={title} handleChange={handleTitleChange} />
      </div>
    </div>
  );
};

const ImageUploadComponent = ({ image, handleImageChange, text }) => {
  return (
    <div className="w-full font-dm flex flex-col space-y-2">
      <FileUpload onChange={(file) => handleImageChange(file)} target={text} />
    </div>
  );
};

const CTAComponent = ({ CTA, handleCTAChange }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full font-dm flex flex-col space-y-2">
        <h1>Text</h1>
        <input
          type="text"
          value={CTA.text}
          placeholder="Enter title"
          onChange={(e) =>
            handleCTAChange({
              ...CTA,
              text: e.target.value.slice(0, 100),
            })
          }
          className="border w-full border-gray-300 rounded-lg p-3 text-gray-700"
          maxLength="100"
        />
      </div>
      <div className="w-full font-dm flex flex-col space-y-2">
        <h1>Color (Hex Code with #)</h1>
        <input
          type="text"
          value={CTA.color}
          placeholder="Enter link"
          onChange={(e) =>
            handleCTAChange({
              ...CTA,
              color: e.target.value,
            })
          }
          className="border w-full border-gray-300 rounded-lg p-3 text-gray-700"
          maxLength="100"
        />
      </div>
      <div>
        <FontDropdown base={CTA} handleChange={handleCTAChange} />
      </div>
    </div>
  );
};

const VariantComponent = ({ variants, setVariants }) => {
  const handleDelete = (index) => {
    // Filter out the variant at the specified index
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    // Prompt the user for a new variant name
    const newVariant = prompt("Enter the name of the new variant:");
    if (newVariant) {
      setVariants((prev) => [...prev, newVariant]);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-lg font-medium mb-4">Manage Variants</h2>
      <ul className="space-y-2">
        {variants &&
          variants.map((variant, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border border-gray-200 rounded-md"
            >
              <span>{variant}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                <IconTrash size={18} />
              </button>
            </li>
          ))}
      </ul>
      <button
        onClick={handleAdd}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-blue-400 transition duration-200"
      >
        Add Variant
      </button>
    </div>
  );
};

const LandingComponent = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [drop, setDrop] = useState(null);
  const [brandName, setBrandName] = useState({
    text: "",
    font: "",
  });
  const [productTitle, setProductTitle] = useState({
    text: "",
    font: "",
  });
  const [price, setPrice] = useState({
    text: "",
    font: "",
  });
  const [logo, setLogo] = useState("");
  const [primaryImg, setPrimaryImg] = useState("");
  const [otherImg1, setOtherImg1] = useState("");
  const [otherImg2, setOtherImg2] = useState("");
  const [otherImg3, setOtherImg3] = useState("");
  const [currCTA, setCurrCTA] = useState({
    text: "",
    color: "",
    font: "",
  });
  const [variants, setVariants] = useState([]);

  const [activeOption, setActiveOption] = useState(options[0].id); // You need to define how activeOption is set

  // Load drop data from localStorage
  useEffect(() => {
    const dropData = localStorage.getItem("drop");
    if (dropData) {
      setDrop(JSON.parse(dropData));
    }
  }, []);

  // When drop is loaded, set state for different components
  useEffect(() => {
    if (drop) {
      setBrandName({
        text: drop?.landing?.brand_name?.text || "",
        font: drop?.landing?.brand_name?.font || "",
      });
      setProductTitle({
        text: drop?.landing?.product_title?.text || "",
        font: drop?.landing?.product_title?.font || "",
      });
      setPrice({
        text: drop?.landing?.price?.text || "",
        font: drop?.landing?.price?.font || "",
      });
      setLogo(drop?.landing?.logo || "");
      setPrimaryImg(drop?.landing?.primary_img || "");
      setOtherImg1(drop?.landing?.other_img1 || "");
      setOtherImg2(drop?.landing?.other_img2 || "");
      setOtherImg3(drop?.landing?.other_img3 || "");
      setCurrCTA({
        text: drop?.landing?.cta?.text || "",
        color: drop?.landing?.cta?.color || "",
        font: drop?.landing?.cta?.font || "",
      });
      setVariants(drop?.landing?.variants || []);
    }
  }, [drop]);

  const updateTextComponent = (newName) => {
    if (activeOption === 1) {
      setBrandName(newName);
    } else if (activeOption === 5) {
      setProductTitle(newName);
    } else if (activeOption === 6) {
      setPrice(newName);
    }
  };

  const updateImgComponent = (file) => {
    if (activeOption === 2) {
      setLogo(file);
    } else if (activeOption === 3) {
      setPrimaryImg(file);
    }
  };

  const handleCTAChange = (newCTA) => {
    setCurrCTA(newCTA);
  };

  const allImages = [primaryImg, otherImg1, otherImg2, otherImg3];
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);

  const onSave = async () => {
    try {
      const formData = new FormData();

      // Add the text fields
      formData.append("clerk_id", user.id);
      formData.append("drop_id", drop.drop._id);

      formData.append("product_title", JSON.stringify(productTitle) || "");
      formData.append("brand_name", JSON.stringify(brandName) || "");
      formData.append("price", JSON.stringify(price) || "");

      formData.append("variants", variants || []);
      formData.append("cta", JSON.stringify(currCTA));

      // Add the files, if available
      if (logo) {
        formData.append("logo", logo);
      }
      if (primaryImg) {
        formData.append("primary_img", primaryImg);
      }
      if (otherImg1) {
        formData.append("other_img1", otherImg1);
      }
      if (otherImg2) {
        formData.append("other_img2", otherImg2);
      }
      if (otherImg3) {
        formData.append("other_img3", otherImg3);
      }

      const landing_response = await fetch(
        "https://dropfastbackend.onrender.com/api/update_landing/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!landing_response.ok) {
        console.error("Failed to fetch update landing");
      } else {
        toast({
          title: `Landing Saved`,
          description: "Good Progress =)",
          action: (
            <ToastAction onClick={() => {}} altText="Close Toast">
              Close
            </ToastAction>
          ),
        });
      }
      const response = await fetch(
        "https://dropfastbackend.onrender.com/api/drop_details/",
        {
          method: "POST",
          body: JSON.stringify({ drop_id: drop.drop._id }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("drop", JSON.stringify(data));
        setDrop(data);
      } else {
        console.error("Failed to fetch drops");
      }
    } catch (error) {
      console.error("Error saving landing:", error);
    }
  };

  return (
    <div className="flex w-full h-screen font-dm">
      {/* Left Panel */}
      <div className="flex flex-col w-1/6 p-4 mr-6 bg-white">
        <h2 className="mb-6 text-2xl font-medium">Landing Page</h2>
        <ul>
          {options.map((option) => (
            <li
              key={option.id}
              className={`flex items-center mb-2 cursor-pointer ${
                activeOption === option.id
                  ? "text-blue-500 font-semibold"
                  : "text-gray-700"
              }`}
              onClick={() => setActiveOption(option.id)}
            >
              <FaCircle
                className={`mr-2 ${
                  activeOption === option.id ? "text-blue-500" : "text-gray-300"
                }`}
              />
              {option.name}
            </li>
          ))}
        </ul>
        <button
          onClick={onSave}
          className="w-1/2 mt-4 mx-auto bg-black border-black border-2 text-white hover:bg-white hover:text-black py-2 rounded-xl transition duration-300 font-dm font-medium"
        >
          Save
        </button>
      </div>

      {/* Middle Panel */}
      <div className="min-h-screen w-1/2 mx-10 border-2 border-gray-200 bg-white">
        {/* Header */}
        <header className="flex justify-between border-b border-gray-300 items-center px-6 py-4 bg-white">
          <img
            src={typeof logo == "string" ? logo : URL.createObjectURL(logo)}
            className="w-10"
          />
          <h1
            style={{ fontFamily: brandName?.font }}
            className="text-xl text-gray-900"
          >
            {brandName?.text}
          </h1>
          <div className="w-10"></div>
        </header>

        {/* Product Body */}
        <div className="w-full mx-auto mt-10 bg-white rounded-lg h-fit pb-16">
          <div className="flex flex-col gap-4">
            {/* Top Section on Mobile - Product Images */}
            <h2
              style={{ fontFamily: productTitle?.font }}
              className="text-2xl text-center font-bold mb-4"
            >
              {productTitle?.text}
            </h2>
            <div className="flex flex-col justify-center mx-auto items-center p-4">
              <img
                src={
                  typeof allImages[selectedImage] == "string"
                    ? allImages[selectedImage]
                    : URL.createObjectURL(allImages[selectedImage])
                }
                alt={`Product ${selectedImage + 1}`}
                className="w-3/5 h-auto rounded-lg"
              />
              <div className="flex space-x-2 mt-4">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 p-1 border-2 rounded-md ${
                      selectedImage === index
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={
                        typeof image == "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Section on Mobile - Product Details */}
            <div className="flex flex-col mx-auto">
              <div>
                <div className="flex flex-row space-x-4 pb-2">
                  <div
                    style={{ fontFamily: price?.font }}
                    className="text-2xl font-semibold text-gray-800"
                  >
                    {price?.text}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex font-mon text-yellow-400">
                      {"★".repeat(Math.floor(5))}
                      {5 % 1 !== 0 && "☆"}
                    </div>
                    <span className="text-gray-500 font-dm">26</span>
                  </div>
                </div>

                {/* Variant Options */}
                <div className="mb-6">
                  <h3 className="text-gray-700 font-medium mb-2">
                    Select Variant:
                  </h3>
                  <div className="flex space-x-2">
                    {variants?.map((variant, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 border rounded-md bg-gray-100 text-gray-700 ${
                          activeVariant == index ? "border-2 border-black" : ""
                        } `}
                        onClick={() => setActiveVariant(index)}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                style={{
                  fontFamily: currCTA?.font,
                  backgroundColor: currCTA?.color,
                }}
                className="w-full px-8 py-4 mt-4 text-lg text-white rounded-md"
              >
                {currCTA?.text}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/4 p-4 bg-white flex flex-col items-center">
        <h2 className="mb-4 font-medium text-3xl">
          {options.find((o) => o.id === activeOption).name}
        </h2>
        <div className="h-0.5 mx-auto bg-gray-300 w-4/5 mb-4"></div>
        <div>
          {/* Render a component based on the active option */}
          {activeOption === 1 && (
            <div>
              <TitleComponent
                handleTitleChange={updateTextComponent}
                title={brandName}
              />
            </div>
          )}
          {activeOption === 2 && (
            <div>
              <ImageUploadComponent
                image={logo}
                handleImageChange={updateImgComponent}
                text={"Logo"}
              />
            </div>
          )}
          {activeOption === 3 && (
            <div>
              <ImageUploadComponent
                image={logo}
                handleImageChange={updateImgComponent}
                text={"Primary Image"}
              />
            </div>
          )}
          {activeOption === 4 && (
            <div className="flex flex-col space-y-6">
              <ImageUploadComponent
                image={logo}
                handleImageChange={setOtherImg1}
                text={"Other Image 1"}
              />
              <ImageUploadComponent
                image={logo}
                handleImageChange={setOtherImg2}
                text={"Other Image 2"}
              />
              <ImageUploadComponent
                image={logo}
                handleImageChange={setOtherImg3}
                text={"Other Image 3"}
              />
            </div>
          )}
          {activeOption === 5 && (
            <div>
              <TitleComponent
                handleTitleChange={updateTextComponent}
                title={productTitle}
              />
            </div>
          )}
          {activeOption === 6 && (
            <div>
              <TitleComponent
                handleTitleChange={updateTextComponent}
                title={price}
              />
            </div>
          )}
          {activeOption === 7 && (
            <div>
              <VariantComponent variants={variants} setVariants={setVariants} />
            </div>
          )}
          {activeOption === 8 && (
            <div>
              <CTAComponent handleCTAChange={handleCTAChange} CTA={currCTA} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Landing = ({ id }) => {
  const [drop, setDrop] = useState(null);

  useEffect(() => {
    setDrop(JSON.parse(localStorage.getItem("drop")));
  }, []);

  return (
    <BuilderLayout
      title={drop ? drop.drop?.title : ""}
      subtitle={"Drop Builder"}
      page={"landing"}
      id={id}
    >
      <LandingComponent />
    </BuilderLayout>
  );
};

export default Landing;
