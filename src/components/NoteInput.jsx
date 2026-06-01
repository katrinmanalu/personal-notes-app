import React from 'react';

const TITLE_MAX = 50;

class NoteInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      errorMsg: '',
    };
    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const value = event.target.value;
    if (value.length > TITLE_MAX) return;
    this.setState({ title: value });
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value, errorMsg: '' });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    if (this.state.body.length < 10) {
      this.setState({ errorMsg: 'Isi catatan minimal harus 10 karakter.' });
      return;
    }

    this.props.addNote({
      title: this.state.title,
      body: this.state.body,
    });

    this.setState({ title: '', body: '', errorMsg: '' });
  }

  render() {
    const { title, body, errorMsg } = this.state;
    const remaining = TITLE_MAX - title.length;
    const isNearLimit = remaining < 10;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {errorMsg && (
          <p className="note-input__feedback note-input__feedback--error">
            {errorMsg}
          </p>
        )}

        <form onSubmit={this.onSubmitEventHandler} data-testid="note-input-form">
          <p
            className={`note-input__title__char-limit${isNearLimit ? ' note-input__title__char-limit--warn' : ''}`}
            data-testid="note-input-title-remaining"
          >
            Sisa karakter: {remaining}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;
