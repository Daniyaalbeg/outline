// @flow
import * as React from "react";
import theme from "../../shared/styles/theme";
import { User, Document, Team, Collection } from "../models";
import Body from "./components/Body";
import Button from "./components/Button";
import Diff from "./components/Diff";
import EmailTemplate from "./components/EmailLayout";
import EmptySpace from "./components/EmptySpace";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Heading from "./components/Heading";

export type Props = {
  actor: User,
  team: Team,
  document: Document,
  collection: Collection,
  eventName: string,
  summary: string,
  unsubscribeUrl: string,
};

export const documentNotificationEmailText = ({
  actor,
  team,
  document,
  collection,
  eventName = "published",
}: Props) => `
"${document.title}" ${eventName}

${actor.name} ${eventName} the document "${document.title}", in the ${collection.name} collection.

Open Document: ${team.url}${document.url}
`;

export const DocumentNotificationEmail = ({
  actor,
  team,
  document,
  collection,
  eventName = "published",
  summary,
  unsubscribeUrl,
}: Props) => {
  const link = `${team.url}${document.url}?ref=notification-email`;

  return (
    <EmailTemplate>
      <Header />

      <Body>
        <Heading>
          “{document.title}” {eventName}
        </Heading>
        <p>
          {actor.name} {eventName} the document "{document.title}", in the{" "}
          {collection.name} collection.
        </p>
        {summary && (
          <>
            <EmptySpace height={20} />
            <Diff href={link}>
              <div dangerouslySetInnerHTML={{ __html: summary }} />
            </Diff>
            <EmptySpace height={20} />
          </>
        )}
        <p>
          <Button href={link}>Open Document</Button>
        </p>
      </Body>

      <Footer unsubscribeUrl={unsubscribeUrl} />
    </EmailTemplate>
  );
};

export const css = `
  font-family: ${theme.fontFamily};
  font-weight: ${theme.fontWeight};
  font-size: 1em;
  line-height: 1.7em;

  pre {
    white-space: pre-wrap;
  }

  img {
    text-align: center;
    max-width: 100%;
    max-height: 75vh;
    clear: both;
  }

  img.image-right-50 {
    float: right;
    width: 50%;
    margin-left: 2em;
    margin-bottom: 1em;
    clear: initial;
  }

  img.image-left-50 {
    float: left;
    width: 50%;
    margin-right: 2em;
    margin-bottom: 1em;
    clear: initial;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1em 0 0.5em;
    font-weight: 500;
  }

  .notice {
    display: flex;
    align-items: center;
    background: ${theme.noticeInfoBackground};
    color: ${theme.noticeInfoText};
    border-radius: 4px;
    padding: 8px 16px;
    margin: 8px 0;
  }

  .notice-tip {
    background: ${theme.noticeTipBackground};
    color: ${theme.noticeTipText};
  }

  .notice-warning {
    background: ${theme.noticeWarningBackground};
    color: ${theme.noticeWarningText};
  }

  b,
  strong {
    font-weight: 600;
  }

  p {
    margin: 0;
  }

  a {
    color: ${theme.link};
  }

  ins {
    background-color: #128a2929;
    text-decoration: none;
  }

  del {
    background-color: ${theme.slateLight};
    color: ${theme.slate};
    text-decoration: strikethrough;
  }

  hr {
    position: relative;
    height: 1em;
    border: 0;
  }
  hr:before {
    content: "";
    display: block;
    position: absolute;
    border-top: 1px solid ${theme.horizontalRule};
    top: 0.5em;
    left: 0;
    right: 0;
  }

  hr.page-break {
    page-break-after: always;
  }
  hr.page-break:before {
    border-top: 1px dashed ${theme.horizontalRule};
  }

  code {
    border-radius: 4px;
    border: 1px solid ${theme.codeBorder};
    padding: 3px 4px;
    font-family: ${theme.fontFamilyMono};
    font-size: 85%;
  }

  mark {
    border-radius: 1px;
    color: ${theme.textHighlightForeground};
    background: ${theme.textHighlight};
    a {
      color: ${theme.textHighlightForeground};
    }
  }

  ul {
    padding-left: 0;
  }

  .checkbox-list-item {
    list-style: none;
    padding: 4px 0;
    margin: 0;
  }

  .checkbox {
    font-size: 0;
    display: block;
    float: left;
    white-space: nowrap;
    width: 12px;
    height: 12px;
    margin-top: 2px;
    margin-right: 8px;
    border: 1px solid ${theme.textSecondary};
    border-radius: 3px;
  }

  pre {
    display: block;
    overflow-x: auto;
    padding: 0.75em 1em;
    line-height: 1.4em;
    position: relative;
    background: ${theme.codeBackground};
    border-radius: 4px;
    border: 1px solid ${theme.codeBorder};
    -webkit-font-smoothing: initial;
    font-family: ${theme.fontFamilyMono};
    font-size: 13px;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    margin: 0;

    code {
      font-size: 13px;
      background: none;
      padding: 0;
      border: 0;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 4px;
    margin-top: 1em;
    box-sizing: border-box;
    * {
      box-sizing: border-box;
    }
    tr {
      position: relative;
      border-bottom: 1px solid ${theme.tableDivider};
    }
    td,
    th {
      position: relative;
      vertical-align: top;
      border: 1px solid ${theme.tableDivider};
      position: relative;
      padding: 4px 8px;
      min-width: 100px;
    }
  }
`;
