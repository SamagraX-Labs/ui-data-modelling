import { useStateContext } from '@component/context';
import router from 'next/router';
import { useState } from 'react';

export default function Home() {
  const { setData, setRes } = useStateContext();
  const [formData, setFormData] = useState({
    problemType: 'text_classification',
    problemDescription: '',
    numSamples: '',
    samples: '',
    numClasses: '',
    inputDivs: [],
    apiKey: '',
  });

  const handleAddInputDiv = () => {
    setFormData({
      ...formData,
      //@ts-ignore
      inputDivs: [...formData.inputDivs, formData?.problemType === "text_classification" ? { text: '', label: '' } : { Input: '', Output: '' }],
    });
  };

  const handleInputChange = (index: any, field: any, value: any) => {
    const updatedInputDivs = [...formData.inputDivs];
    //@ts-ignore
    updatedInputDivs[index][field] = value;
    setFormData({
      ...formData,
      inputDivs: updatedInputDivs,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/data/view`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-OpenAI-Key': formData?.apiKey,
          },
          body: JSON.stringify({
            prompt: JSON.stringify(formData?.problemDescription) + "\n" + "Some samples are as follows, and generate data in the following structure:" + "\n" + JSON.stringify(formData.inputDivs),
            num_samples: parseInt(formData?.numSamples) || 10,
            // samples: ,
            task: formData?.problemType,
            num_labels: formData?.inputDivs?.length,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setRes(result);
        setData(formData);
        router.push('/data');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderInputDivs = () => {
    return formData.inputDivs.map((div: any, index) => (
      <div key={index} className="flex">
        <input
          type="text"
          className="border rounded mt-2  font-regular w-full px-2 shadow-lg py-1"
          placeholder={formData?.problemType === "text_classification" ? 'Text' : "Input"}
          value={formData?.problemType === "text_classification" ? div.text : div.Input}
          onChange={(e) => handleInputChange(index, formData?.problemType === "text_classification" ? 'text' : "Input", e.target.value)}
        />
        <input
          type="text"
          className="border rounded mt-2 font-regular w-full px-2 shadow-lg py-1 ml-4"
          placeholder={formData?.problemType === "text_classification" ? 'Label' : "Output"}
          value={formData?.problemType === "text_classification" ? div.label : div.Output}
          onChange={(e) => handleInputChange(index, formData?.problemType === "text_classification" ? 'label' : "Output", e.target.value)}
        />
      </div>
    ));
  };

  return (
    <main className={``}>
      <div className="flex justify-center">
        {/* <div className="col-span-5 flex justify-end">
          <img src="./illustration.svg" width={"750px"} height={"750px"} />
        </div> */}
        <div className="col-span-4 w-[75vw] flex justify-center items-center flex-col min-h-screen mx-10 py-5">
          {/* <div className="bg-primary border-b border-[#aed1f5] px-10 w-full py-8 text-center text-primary font-bold text-[25px] box-shadow-box">
            Simplify the{' '}
            <span className="text-yellow py-2">creation of data</span>
          </div> */}
          <div className="box-shadow-box w-full bg-white py-6 px-4">
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="dropdown">Types of problems:</label>
              <select
                name="dropdown"
                id="dropdown"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                value={formData.problemType}
                onChange={(e) =>
                  setFormData({ ...formData, problemType: e.target.value })
                }>
                <option value="text_classification">Text Classification</option>
                <option value="seq2seq">Sequence 2 Sequence</option>
              </select>
            </div>
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="dropdown"> Description of the problem</label>
              <input
                type="text"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                placeholder={'Description of the problem'}
                value={formData.problemDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    problemDescription: e.target.value,
                  })
                }
              />
            </div>
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="num-samples">Number of samples:</label>
              <input
                type="number"
                name="num-samples"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                placeholder="Number of samples"
                value={formData.numSamples}
                onChange={(e) =>
                  setFormData({ ...formData, numSamples: e?.target?.value })
                }
              />
            </div>
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="samples">Samples:</label>
              <input
                type="text"
                name="samples"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                placeholder="Type comma separated samples"
                value={formData.samples}
                onChange={(e) =>
                  setFormData({ ...formData, samples: e?.target?.value })
                }
              />
            </div>
            {formData?.problemType === "text_classification" && <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="num-classes">Number of classes:</label>
              <input
                type="number"
                name="num-classes"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                placeholder="Number of classes"
                value={formData.numClasses}
                onChange={(e) =>
                  setFormData({ ...formData, numClasses: e?.target?.value })
                }
              />
            </div>}
            <div className="py-2 w-full text-primary font-demi p-2 text-center">
              <div className="flex items-center">
                <p>Example</p>
              </div>
              {renderInputDivs()}
              <button
                onClick={handleAddInputDiv}
                className="mt-4 w-fit rounded-lg px-12 bg-[#aed1f5] font-bold pb-1 text-[25px] text-white cursor-pointer">
                +
              </button>
            </div>
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="api">API Key for GPT:</label>
              <input
                name="api"
                type="text"
                placeholder="API Key"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                value={formData.apiKey}
                onChange={(e) =>
                  setFormData({ ...formData, apiKey: e.target.value })
                }
              />
            </div>
            <div className="py-2 m-auto bg-[#aed1f5] text-center rounded-lg font-bold p-2 mt-5 cursor-pointer">
              <button onClick={handleSubmit}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
