import React from 'react'

function FloatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen w-screen overflow-hidden flex items-center justify-center bg-white'>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
        }}
        className="md:h-[calc(100vh-2rem)] border border-[#cdcdcd]/70 overflow-hidden h-full md:w-[calc(100vw-2rem)] w-full rounded-none md:rounded-3xl">
        {children}
      </div>
    </div>
  )
}


export default FloatLayout