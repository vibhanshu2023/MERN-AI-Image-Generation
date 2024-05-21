
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils"
import { FormField, Loader, Card } from "../components";

const CreatePost =()=> {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:'',
  })
  const [loading, setLoading] = useState(false)
  const [generatingImg, setGeneratingImg]= useState(false)

  const handleSubmit =() =>{

  }

  const handleChange =(e)=>{

  }

  const handleSurpriseMe =() =>{

  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-#[222328] text-[32px]">
          Create
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px] ">Create Imaginitive and Visual Images through DALL-E AI</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5"> 
          <FormField
            LabelName="Name"
            type="text"
            name="name"
            placeholder="Vaibhav"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="3D render of a cute tropical fish in an aquarium on a dark blue background digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe
          />

          {/* here we are creating a div that will contain the generated img */}
          <div className="relative bg-grey-50 border border-grey-300 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center"> 
          { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        
        {/* <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>
        </div> */}
        
      </form>
    </section>
  )
}

export default CreatePost;