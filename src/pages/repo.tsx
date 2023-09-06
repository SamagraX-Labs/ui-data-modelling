import router from "next/router";
import { useState } from "react";

export default function Repo() {
  const [formData, setFormData] = useState({
    repoPath: "",
    huggingFaceKey: "",
    numClasses: "",
    validation: "",
  });

  const handleSubmit = () => {
    console.log(formData);
    alert("Submitted!");
  };

  return (
    <main className={``}>
      <div className="flex justify-center">
        {/* <div className="col-span-5 flex justify-end">
          <img src="./illustration.svg" width={"750px"} height={"750px"} />
        </div> */}
        <div className="w-[auto] col-span-4 flex justify-center items-center flex-col min-h-screen mx-10 py-20">
          <div className="bg-primary border-b border-[#361b14] px-10 w-full py-8 text-center text-primary font-bold text-[25px] box-shadow-box">
            Share the{" "}
            <span className="text-yellow px-4 py-2">repo credentials</span>
          </div>
          <div className="box-shadow-box w-full bg-white py-6 px-4">
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="dropdown"> Repo Path:</label>
              <input
                type="text"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                placeholder={"Repo Path"}
                value={formData.repoPath}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    repoPath: e.target.value,
                  })
                }
              />
            </div>
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="num-classes">Hugging face key:</label>
              <input
                type="number"
                name="num-classes"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                placeholder="Hugging face key"
                value={formData.huggingFaceKey}
                onChange={(e) =>
                  setFormData({ ...formData, huggingFaceKey: e.target.value })
                }
              />
            </div>
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="num-classes">Number of classes:</label>
              <input
                type="number"
                name="num-classes"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                placeholder="Number of classes"
                value={formData.numClasses}
                onChange={(e) =>
                  setFormData({ ...formData, numClasses: e.target.value })
                }
              />
            </div>
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="num-classes">Validation Split:</label>
              <input
                type="text"
                name="num-classes"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                placeholder="Total should add to 1 or 100"
                value={formData.validation}
                onChange={(e) =>
                  setFormData({ ...formData, validation: e.target.value })
                }
              />
            </div>
            <div className="py-2 m-auto bg-[#361b14] text-center rounded-lg font-bold p-2 mt-5 cursor-pointer">
              <button onClick={handleSubmit}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}