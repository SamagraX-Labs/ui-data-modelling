import { useStateContext } from '@component/context';
import router from 'next/router';
import { useEffect, useState } from 'react';

export default function Repo() {
  const { data } = useStateContext();
  const [formData, setFormData] = useState({
    repoPath: '',
    huggingFaceKey: '',
    validation: '',
  });

  const handleSubmit = async (type: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data`, {
        method: type === 'create' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-OpenAI-Key': data.apiKey,
          'X-HuggingFace-Key': formData.huggingFaceKey,
        },
        body: JSON.stringify({
          prompt: data.inputDivs,
          num_samples: parseInt(data.numClasses),
          repo: formData.repoPath,
          split: formData.validation.split(' ').map(Number),
          task: data.problemType,
          num_labels: data.inputDivs.length,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Submitted!');
        console.log(result);
      } else {
        // Handle error response
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className={``}>
      <div className="flex justify-center">
        {/* <div className="col-span-5 flex justify-end">
          <img src="./illustration.svg" width={"750px"} height={"750px"} />
        </div> */}
        <div className="w-[auto] col-span-4 flex justify-center items-center flex-col min-h-screen mx-10 py-20">
          <div className="bg-primary border-b border-[#aed1f5] px-10 w-full py-8 text-center text-primary font-bold text-[25px] box-shadow-box">
            Share the{' '}
            <span className="text-yellow py-2">repo credentials</span>
          </div>
          <div className="box-shadow-box w-full bg-white py-6 px-4">
            <div className="py-2 w-full text-primary font-demi p-2">
              <label htmlFor="dropdown"> Repo Path:</label>
              <input
                type="text"
                className="border rounded mt-2 w-full px-2 shadow-lg py-1"
                placeholder={'Repo Path'}
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
              <label htmlFor="num-classes">
                Validation Split: (space separated values)
              </label>
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
            <div className="flex items-center justify-center">
              <div className="py-2 bg-[#aed1f5] text-center rounded-lg font-bold p-2 mt-5 cursor-pointer w-full mx-2">
                <button onClick={() => handleSubmit('create')}>Create</button>
              </div>
              <div className="py-2 bg-[#aed1f5] text-center rounded-lg font-bold p-2 mt-5 cursor-pointer w-full mx-2">
                <button onClick={() => handleSubmit('update')}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
