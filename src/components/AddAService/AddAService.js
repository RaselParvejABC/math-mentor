import React, { useState } from "react";
import {
  Textarea,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { SpinnerDotted } from "spinners-react";
import useDocumentTitle from "../../custom-hooks/useDocumentTitle";

const AddAService = () => {
  useDocumentTitle("Add a Service");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleDescriptionChange = (event) => {
    const newText = event.target.value;
    if (newText.length > 300) {
      setDescription(newText.substring(0, 300));
      return;
    }
    setDescription(newText);
  };

  const handleTitleChange = (event) => {
    const newText = event.target.value;
    if (newText.length > 30) {
      setTitle(newText.substring(0, 30));
      return;
    }
    setTitle(newText);
  };

  const handleSubmission = async (event) => {
    event.preventDefault();
    setError(null);
    if (title?.trim().length === 0) {
      setError("Names cannot be empty!");
      return;
    }

    if (title?.trim().length > 30) {
      setError("Max 30 Chars Title!");
      return;
    }

    if (description?.trim().length > 300) {
      setError("Max 300 Chars Description!");
      return;
    }

    if (!price?.match(/^\d+$/gi)) {
      setError("Invalid Price");
      return;
    }

    if (event.target.propic.files[0] === "") {
      setError("Add a Banner.");
      return;
    }

    const formData = new FormData();
    formData.append("key", process.env.REACT_APP_ImgBB_API_KEY);
    formData.append("image", event.target.propic.files[0]);

    setUploadingImage(true);
    let photoURL = null;
    try {
      const imgBBResponse = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
      const imgBBResponseBody = await imgBBResponse.json();
      photoURL = imgBBResponseBody["data"]["display_url"];
    } catch (err) {
      console.error(err);
      setError("Unable to Upload the Picture!");
      return;
    } finally {
      setUploadingImage(false);
    }

    if (!photoURL) {
      return;
    }
    const data = {
      title,
      image: photoURL,
      price: `${price}`,
      description,
    };

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_MathMentorServer}/service`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseBody = await response.json();
      if (responseBody.success) {
        setTitle("");
        setDescription("");
        setPrice("");
        setShowDialog(true);
      } else {
        throw new Error("Server: Not Added");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to Add the Service!");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-5 sm:justify-center bg-gray-50">
      <div>
        <h3 className="text-4xl font-bold text-blue-500">Add A Service</h3>
      </div>
      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
        <form onSubmit={handleSubmission}>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700 undefined"
            >
              Service Title (Max 30 Chars)
            </label>
            <div className="flex flex-col items-start">
              <input
                value={title}
                type="text"
                name="title"
                onChange={handleTitleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700 undefined"
            >
              Service Price ($)
            </label>
            <div className="flex flex-col items-start">
              <input
                onChange={(event) => setPrice(event.target.value)}
                value={price}
                type="number"
                name="price"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mt-4 mb-12">
            <label
              htmlFor="propic"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Service Banner
            </label>
            <div className="flex flex-col items-start">
              <input
                required
                accept="image/png, image/jpeg"
                type="file"
                name="propic"
                className="pl-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <Textarea
            className="h-fit"
            size="lg"
            label={`${description.length}/300 Chars`}
            value={description}
            onChange={handleDescriptionChange}
          />

          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600"
              disabled={loading || uploadingImage}
            >
              Submit
            </button>
          </div>
        </form>

        <Dialog open={showDialog} size="xs">
          <DialogHeader>Success</DialogHeader>
          <DialogBody divider className="text-black">
            Your Service has been added!
          </DialogBody>
          <DialogFooter>
            <Button
              color="green"
              onClick={() => {
                setShowDialog(false);
                setDescription("");
                setTitle("");
                setPrice("");
              }}
              className="mr-1"
            >
              <span>OK</span>
            </Button>
          </DialogFooter>
        </Dialog>

        {error && <div className="mt-4 text-center text-red-500">{error}</div>}

        {(loading || uploadingImage) && (
          <div className="flex flex-row justify-center mt-6">
            <SpinnerDotted size="70" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAService;
