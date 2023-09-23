import { useState, useEffect } from 'react';
import router from 'next/router';
import { useStateContext } from '@component/context';

export default function Data() {
  const { res } = useStateContext();
  const [tableData, setTabledata] = useState([]);

  useEffect(() => {
    function fetchTaskStatus(taskId: string) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/track/${taskId}`,{
        headers:{
          "ngrok-skip-browser-warning": "69420"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Status:', data.status);
          if (data.status !== 'Generated') {
            setTimeout(() => {
              fetchTaskStatus(taskId);
            }, 3000);
          } else {
            console.log('Status:', data.status);
            setTabledata(data?.response);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    fetchTaskStatus(res?.task_id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={``}>
      <div className="flex justify-center">
        <div className="w-[auto] col-span-4 flex justify-center items-center flex-col min-h-screen mx-10 py-20">
          <div className="bg-primary border-b border-[#361b14] px-10 w-full py-8 text-center text-primary font-bold text-[25px] box-shadow-box">
            <span className="text-yellow px-4 py-2">Output</span> of data
          </div>
          <div className="box-shadow-box w-full bg-white py-6 px-4 text-primary font-medium">
            {tableData &&
              tableData.length > 0 &&
              tableData?.map((data) => <>
              <div className='bg-primary px-5'>
                {/* @ts-ignore */}
                {data?.label ? data?.label : data?.Input} - {data?.text ? data?.text : data?.Output}
              </div>
              </>)}
            {/* <table className="table-auto">
              <thead className="bg-[#361b14] text-white font-demi py-2">
                <tr className="border-b pb-2">
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Class</th>
                  <th className="px-4 py-3">Phone Number</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">John Doe</td>
                  <td className="px-4 py-2">Grade 10</td>
                  <td className="px-4 py-2">555-123-4567</td>
                  <td className="px-4 py-2">john@example.com</td>
                  <td className="px-4 py-2">123 Main St, City</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">2</td>
                  <td className="px-4 py-2">Jane Smith</td>
                  <td className="px-4 py-2">Grade 9</td>
                  <td className="px-4 py-2">555-987-6543</td>
                  <td className="px-4 py-2">jane@example.com</td>
                  <td className="px-4 py-2">456 Elm St, Town</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">3</td>
                  <td className="px-4 py-2">Michael Johnson</td>
                  <td className="px-4 py-2">Grade 11</td>
                  <td className="px-4 py-2">555-555-5555</td>
                  <td className="px-4 py-2">michael@example.com</td>
                  <td className="px-4 py-2">789 Oak St, Village</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">4</td>
                  <td className="px-4 py-2">Sarah Brown</td>
                  <td className="px-4 py-2">Grade 12</td>
                  <td className="px-4 py-2">555-111-2222</td>
                  <td className="px-4 py-2">sarah@example.com</td>
                  <td className="px-4 py-2">101 Pine St, Hamlet</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">5</td>
                  <td className="px-4 py-2">David Lee</td>
                  <td className="px-4 py-2">Grade 8</td>
                  <td className="px-4 py-2">555-222-3333</td>
                  <td className="px-4 py-2">david@example.com</td>
                  <td className="px-4 py-2">222 Cedar St, County</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">6</td>
                  <td className="px-4 py-2">Lisa Garcia</td>
                  <td className="px-4 py-2">Grade 10</td>
                  <td className="px-4 py-2">555-444-5555</td>
                  <td className="px-4 py-2">lisa@example.com</td>
                  <td className="px-4 py-2">333 Maple St, State</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">7</td>
                  <td className="px-4 py-2">James Wilson</td>
                  <td className="px-4 py-2">Grade 11</td>
                  <td className="px-4 py-2">555-666-7777</td>
                  <td className="px-4 py-2">james@example.com</td>
                  <td className="px-4 py-2">444 Birch St, Country</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">8</td>
                  <td className="px-4 py-2">Emily Davis</td>
                  <td className="px-4 py-2">Grade 9</td>
                  <td className="px-4 py-2">555-333-2222</td>
                  <td className="px-4 py-2">emily@example.com</td>
                  <td className="px-4 py-2">555 Oak St, Town</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">9</td>
                  <td className="px-4 py-2">Matthew Taylor</td>
                  <td className="px-4 py-2">Grade 10</td>
                  <td className="px-4 py-2">555-777-8888</td>
                  <td className="px-4 py-2">matthew@example.com</td>
                  <td className="px-4 py-2">666 Elm St, City</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">10</td>
                  <td className="px-4 py-2">Olivia Martinez</td>
                  <td className="px-4 py-2">Grade 12</td>
                  <td className="px-4 py-2">555-999-0000</td>
                  <td className="px-4 py-2">olivia@example.com</td>
                  <td className="px-4 py-2">777 Pine St, Village</td>
                </tr>
              </tbody>
            </table> */}
          </div>
          <div className="bg-primary border-b border-[#361b14] px-10 w-full py-3 text-center text-primary font-bold text-[25px] box-shadow-box flex justify-center">
            <div
              className="bg-[#361b14] px-3 mr-2 cursor-pointer"
              onClick={() => {
                router.push('/repo');
              }}>
              😊
            </div>
            <div
              className="bg-[#361b14] px-3 cursor-pointer"
              onClick={() => {
                router.push('/');
              }}>
              😕
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
