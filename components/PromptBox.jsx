import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const PromptBox = ({ setIsLoading, isLoading }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // handle prompt submission
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-[#404045] p-4 rounded-lg mt-4 transition-all"
        >
            <textarea 
                className='outline-none w-full resize-none overflow-hidden break-words bg-transparent'
                rows={2}
                placeholder='Message Noesis'
                required
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
            />

            <div className='flex items-center justify-between text-sm mt-2'>
                <div className='flex items-center gap-2'>
                    <p className='flex items-center gap-2 text-xs border border-gray-300/20 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                        <Image className='h-5' src={assets.deepthink_icon} alt='NoeThink icon' />
                        NoeThink (R1)
                    </p>
                    <p className='flex items-center gap-2 text-xs border border-gray-300/20 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition'>
                        <Image className='h-5' src={assets.search_icon} alt='Search icon' />
                        Search
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                     <Image className='w-4 cursor-pointer' src={assets.pin_icon} alt='Pin icon' />
                     <button 
                        type="submit"
                        className={`${prompt ? 'bg-primary' : 'bg-[#71717a]'} rounded-full cursor-pointer p-2`}
                        aria-label="Send prompt"
                     >
                         <Image className='w-3.5 aspect-square' src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt='Send icon' />
                     </button>
                </div>
            </div>
        </form>
    )
}

export default PromptBox;
