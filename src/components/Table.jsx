import React from 'react';



export function  Head({ children, className }){
  const mainClass="header"
  return (
    <div className={className ?`${className} ${mainClass}`:mainClass}>
      {children}
    </div>
  );
};

export function  Body({ children, className })  {
  const mainClass="body flex flex-col gap-1 my-3"
  return (
    <div className={className ?`${className} ${mainClass}`:mainClass}>
      {children}
    </div>
  );
};

export function  Row ({ children, className }) {
  const mainClass="p-3 row flex items-center"
  return (
    <div className={className ?`${className} ${mainClass}`:mainClass}>
  
      {children}
    </div>
  );
};

export function  Col ({ children, className }) {
  const mainClass ="col flex flex-1 p-3 items-center"
  return <span className={className ?`${className} ${ mainClass}`:mainClass} >{children}</span>;
};


export function Table ({ children, className }){
  const mainClass = "table-group flex flex-col w-full"
    return (
      <div className={className ?`${className} ${mainClass}`:mainClass} >
        {children}
      </div>
    );
  };
