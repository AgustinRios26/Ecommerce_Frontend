import React from 'react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center space-x-2 mt-32">
	<div className="w-4 h-4 rounded-full animate-pulse bg-[#fa7500]"></div>
	<div className="w-4 h-4 rounded-full animate-pulse bg-[#fa7500]"></div>
	<div className="w-4 h-4 rounded-full animate-pulse bg-[#fa7500]"></div>
</div>
  )
}