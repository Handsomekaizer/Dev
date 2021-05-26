import { useEffect, useState } from "react"
import DeviceDetector from "device-detector-js"
import "./App.css"

const deviceDetector = new DeviceDetector()
const userAgent = navigator.userAgent
const device = deviceDetector.parse(userAgent)

const App = () => {
	const [deviceName, setDeviceName] = useState("")
	const [OS, setOS] = useState("")
	const [location, setLocation] = useState({})

	const getOS = () => {
		const osName = device.os.name
		const osVersion = device.os.version

		const userOS = `${osName}, ${osVersion}`
		setOS(userOS)
	}
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition)
		}
	}

	const getDevice = () => {
		const deviceType = device.device.type
		const deviceBrand = device.device.brand
		const deviceModel = device.device.model

		setDeviceName(`${deviceType} ${deviceBrand} ${deviceModel}`)
	}

	const showPosition = (position) => {
		const loc = {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		}
		setLocation(loc)
	}

	useEffect(() => {
		getOS()
		getLocation()
		getDevice()
	})

	return (
		<div className='main-container'>
			<div className='content'>
				<p className='info'>
					Your device is <span className='info__specs'>{deviceName}</span>
					<br />
					You are using <span className='info__specs'>{OS}</span>
				</p>
			</div>
		</div>
	)
}

export default App
