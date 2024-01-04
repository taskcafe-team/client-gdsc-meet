import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { margin, padding } from 'polished'

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" sx={{
			padding:'5px' , margin:'2px', borderRadius:'30px'
		}}>
			{'Copyright © '}
			<Link color="inherit" href="https://www.gdscmeet.live">
				Gdsc Meet
			</Link>
			{` ${new Date().getFullYear()}.`}
		</Typography>
	)
}

export default function Footer() {
	return (
		<footer className="flex flex-col items-center bg-neutral-900 p-4 rounded m-2 text-center text-white bg-gray-10 dark:bg-gray-80">
		  {/* Copyright section */}
		  <div className="w-full text-center text-black dark:text-white" >
			© 2023 Copyright:
			<a className="text-whites" href="https://tw-elements.com/">GDSC meet</a>
		  </div>
		</footer>
	  );
}
