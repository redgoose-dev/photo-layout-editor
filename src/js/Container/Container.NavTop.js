var Container_NavTop = React.createClass({

  displayName: 'Nav-top',

  /**
   * render
   */
  render: function () {
    return React.createElement(
      "nav",
      { className: "nav-top" },
      React.createElement(
        "div",
        { className: "block" },
        React.createElement(
          "button",
          { type: "button" },
          React.createElement(
            "i",
            { className: "sp-ico ico-setting abs" },
            "Setting"
          )
        ),
        React.createElement(
          "article",
          { className: "form" },
          React.createElement(
            "form",
            { action: "#" },
            React.createElement(
              "fieldset",
              null,
              React.createElement(
                "legend",
                { className: "blind" },
                "Settings form"
              ),
              React.createElement(
                "h1",
                null,
                "Settings"
              ),
              React.createElement(
                "dl",
                null,
                React.createElement(
                  "dt",
                  null,
                  React.createElement(
                    "label",
                    { htmlhtmlFor: "frm-name" },
                    "Min Width"
                  )
                ),
                React.createElement(
                  "dd",
                  null,
                  React.createElement("input", { type: "number", name: "width", id: "frm-name", min: "1", max: "999" }),
                  React.createElement(
                    "span",
                    null,
                    "px"
                  )
                )
              ),
              React.createElement(
                "dl",
                null,
                React.createElement(
                  "dt",
                  null,
                  React.createElement(
                    "label",
                    { htmlFor: "frm-height" },
                    "Min Height"
                  )
                ),
                React.createElement(
                  "dd",
                  null,
                  React.createElement("input", { type: "number", name: "height", id: "frm-height", min: "1", max: "999" }),
                  React.createElement(
                    "span",
                    null,
                    "px"
                  )
                )
              ),
              React.createElement(
                "dl",
                null,
                React.createElement(
                  "dt",
                  null,
                  React.createElement(
                    "label",
                    { htmlFor: "frm-max-col" },
                    "Max Column"
                  )
                ),
                React.createElement(
                  "dd",
                  null,
                  React.createElement("input", { type: "number", name: "max_col", id: "frm-max-col", min: "1", max: "99" }),
                  React.createElement(
                    "span",
                    null,
                    "ea"
                  )
                )
              ),
              React.createElement(
                "dl",
                null,
                React.createElement(
                  "dt",
                  null,
                  React.createElement(
                    "label",
                    { htmlFor: "frm-outer-margin" },
                    "Outer Margin"
                  )
                ),
                React.createElement(
                  "dd",
                  null,
                  React.createElement("input", { type: "number", name: "outer-margin", id: "frm-outer-margin", min: "1", max: "500" }),
                  React.createElement(
                    "span",
                    null,
                    "px"
                  )
                )
              ),
              React.createElement(
                "dl",
                null,
                React.createElement(
                  "dt",
                  null,
                  React.createElement(
                    "label",
                    { htmlFor: "frm-inner-margin" },
                    "Inner Margin"
                  )
                ),
                React.createElement(
                  "dd",
                  null,
                  React.createElement("input", { type: "number", name: "inner-margin", id: "frm-inner-margin", min: "1", max: "500" }),
                  React.createElement(
                    "span",
                    null,
                    "px"
                  )
                )
              )
            ),
            React.createElement(
              "nav",
              null,
              React.createElement(
                "span",
                null,
                React.createElement(
                  "button",
                  { type: "reset" },
                  "Reset"
                )
              ),
              React.createElement(
                "span",
                null,
                React.createElement(
                  "button",
                  { type: "submit" },
                  "Apply"
                )
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "block" },
        React.createElement(
          "button",
          { type: "button" },
          React.createElement(
            "i",
            { className: "sp-ico ico-arrow-random abs" },
            "Random block"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "block" },
        React.createElement(
          "button",
          { type: "button" },
          React.createElement(
            "i",
            { className: "sp-ico ico-plus abs" },
            "Add block"
          )
        )
      )
    );
  }
});