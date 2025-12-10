

import Herosection from '../../components/Herosection'

import Comparison from './Comparison'
import Reviews from './Reviews'
import Steps from './Steps'
import Accordion from './Accordion'
import Partners from './Partners'
import Footer from './Footer1'
import About from './About'
import Contact from './Contact'


const LandingPage = () => {
  return (
    <div className='md:pt-20 pt-10 '>
    <Herosection/>
    <Accordion/>
        <Steps/>
        <Comparison/>
        <Reviews/>
        <About/>
        <Partners/>
        <Contact/>
        
        <Footer/>
       
        
    </div>
  )
}

export default LandingPage