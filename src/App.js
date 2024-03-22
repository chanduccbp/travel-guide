import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

// Replace your code here
class App extends Component {
  state = {isLoading: true, travelGuideArray: []}

  componentDidMount = () => {
    this.getTravelGuide()
  }

  getTravelGuide = async () => {
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()

    const updatedData = data.packages.map(eachObj => ({
      id: eachObj.id,
      name: eachObj.name,
      imageUrl: eachObj.image_url,
      description: eachObj.description,
    }))

    this.setState({travelGuideArray: updatedData, isLoading: false})
  }

  renderView = () => {
    const {isLoading, travelGuideArray} = this.state

    if (isLoading) {
      return (
        <div data-testid="loader" className="loader-cont">
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
      )
    }

    return (
      <ul className="packages-list">
        {travelGuideArray.map(eachObj => (
          <li key={eachObj.id} className="travel-item">
            <img src={eachObj.imageUrl} alt={eachObj.name} className="pic" />
            <div className="des">
              <h1 className="item-head">{eachObj.name}</h1>
              <p>{eachObj.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="bg-cont">
        <h1 className="head">Travel Guide</h1>
        {this.renderView()}
      </div>
    )
  }
}

export default App
