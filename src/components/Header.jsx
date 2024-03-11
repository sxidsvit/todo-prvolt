import React from 'react'

const Header = () => {
  return (
    <header className="pt-[10px] pb-[60px]">
      <h1 className="text-xl text-white/80 font-semibold text-center uppercase">
        Todo list
      </h1>
      <h2 className="text-[12px] text-white/60 font-normal text-center -mt-2">
        created using Redux ToolKit, TailwindCSS & Zod
      </h2>
      <p className="text-[8px] text-white/40 font-normal text-center -mt-[6px] cursor-pointer">
        <a
          href='https://github.com/sxidsvit/todo-prvolt/tree/main'
          target="_blank"
          alt="Github repository"
        >
          (for more information visit this Github repository)
        </a>
      </p>

    </header>
  )
}

export default Header