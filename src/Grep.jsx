/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import React from "react";

export default function Grep({ func }) {
  const [haystack, setHaystack] = React.useState(
    `React is the entry point to the React library. If you load React from a script tag, these top-level APIs are available on the React global. If you use ES6 with npm, you can write import React from 'react'. If you use ES5 with npm, you can write var React = require('react'). React`
  );
  const [needle, setNeedle] = React.useState("React");

  const highlightMatches = (haystack, needle) => {
    const matches = func(haystack, needle);
    if (!haystack.length || !needle.length || !matches.length) return haystack;
    const haystackArr = haystack.split("");
    const before = `<span style='text-decoration: underline; font-weight: bold; color: #c33'>`;
    const after = "</span>";
    matches.forEach(match => {
      const start = match;
      const end = start + needle.length;
      haystackArr[start] = before + haystackArr[start];
      haystackArr[end] = after + (haystackArr[end] || "");
    });
    return haystackArr.join("");
  };

  return (
    <div
      css={css`
        input {
          margin-right: 1em;
          width: 30%;
        }
      `}
    >
      <p>
        Haystack:{" "}
        <input
          placeholder="haystack"
          value={haystack}
          onChange={e => setHaystack(e.target.value)}
        />{" "}
        Needle:{" "}
        <input
          placeholder="needle"
          value={needle}
          onChange={e => setNeedle(e.target.value)}
        />
      </p>
      <p
        className="grep-container"
        style={{ fontFamily: "monospace" }}
        dangerouslySetInnerHTML={{ __html: highlightMatches(haystack, needle) }}
      />
    </div>
  );
}
