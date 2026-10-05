import React, { Component } from "react";
import "./LifecycleComponents.css";

export class Timer extends Component {
  state = {
    seconds: 0,
    running: false
  };

  timerId = null;

  componentDidMount() {
    console.log("Timer: componentDidMount");
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
    console.log("Timer: componentWillUnmount");
  }

  startTimer = () => {
    if (this.timerId) return;

    this.timerId = setInterval(() => {
      this.setState(state => ({
        seconds: state.seconds + 1,
        running: true
      }));
    }, 1000);

    this.setState({ running: true });
  };

  stopTimer = () => {
    clearInterval(this.timerId);
    this.timerId = null;
    this.setState({ running: false });
  };

  resetTimer = () => {
    this.stopTimer();
    this.setState({ seconds: 0 });
  };

  render() {
    return (
      <div className="lifecycle-block">
        <h4>Timer</h4>
        <div className="counter">{this.state.seconds} сек.</div>

        <button type="button" onClick={this.startTimer}>Старт</button>
        <button type="button" onClick={this.stopTimer}>Стоп</button>
        <button type="button" className="secondary" onClick={this.resetTimer}>
          Сброс
        </button>
      </div>
    );
  }
}

export class WindowSizeTracker extends Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    return (
      <div className="lifecycle-block">
        <h4>Размер окна</h4>
        <p>{this.state.width} × {this.state.height}</p>
      </div>
    );
  }
}

export class DataFetcher extends Component {
  state = {
    data: null,
    loading: false,
    error: ""
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.loadData();
    }
  }

  loadData = async () => {
    this.setState({
      loading: true,
      error: ""
    });

    try {
      const response = await fetch(this.props.url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      this.setState({
        data,
        loading: false
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false
      });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <div className="lifecycle-block">
        <h4>Загрузка данных</h4>

        {loading && <p>Загрузка...</p>}
        {error && <p className="fetch-error">Ошибка: {error}</p>}

        {Array.isArray(data) && (
          <ul className="fetch-list">
            {data.slice(0, 5).map(item => (
              <li key={item.id}>{item.name || item.title}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

class LifecycleComponents extends Component {
  render() {
    return (
      <section className="task-section">
        <h2>Жизненный цикл компонентов</h2>

        <div className="component-demo">
          <h3>Задание 5: Методы жизненного цикла</h3>

          <div id="lifecycle-output" className="output">
            <Timer />
            <WindowSizeTracker />
            <DataFetcher url="https://jsonplaceholder.typicode.com/users" />
          </div>
        </div>
      </section>
    );
  }
}

export default LifecycleComponents;
