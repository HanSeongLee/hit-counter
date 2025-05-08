'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';

interface BadgeGeneratorProps {
  className?: string;
}

const BadgeGenerator: React.FC<BadgeGeneratorProps> = ({ className }) => {
  // State for form inputs
  const [url, setUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('hits');
  const [border, setBorder] = useState<'ROUND' | 'SQUARE' | 'NONE'>('ROUND');
  const [titleBgColor, setTitleBgColor] = useState<string>('#555555');
  const [countBgColor, setCountBgColor] = useState<string>('#4CAF50');
  const [displayMode, setDisplayMode] = useState<'BOTH' | 'TOTAL' | 'DAILY'>('BOTH');
  const [titleTextColor, setTitleTextColor] = useState<string>('#FFFFFF');
  const [countTextColor, setCountTextColor] = useState<string>('#FFFFFF');

  const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://hits.devcomma.com';

  // State for copy feedback
  const [copyFeedback, setCopyFeedback] = useState<{ [key: string]: boolean }>({
    markdown: false,
    html: false,
    url: false,
  });

  // Generate the badge URL
  const generateBadgeUrl = (): string => {
    if (!url) return '';

    const encodedUrl = encodeURIComponent(url);
    let badgeUrl = `${BASE_URL}/api/hit?url=${encodedUrl}`;

    if (title) {
      badgeUrl += `&title=${encodeURIComponent(title)}`;
    }

    if (countBgColor) {
      badgeUrl += `&count_bg=${encodeURIComponent(countBgColor)}`;
    }

    if (border !== 'ROUND') {
      badgeUrl += `&border=${border.toLowerCase()}`;
    }

    if (titleBgColor !== '#555555') {
      badgeUrl += `&title_bg=${encodeURIComponent(titleBgColor)}`;
    }

    if (displayMode !== 'BOTH') {
      badgeUrl += `&display=${displayMode.toLowerCase()}`;
    }

    if (titleTextColor !== '#FFFFFF') {
      badgeUrl += `&title_color=${encodeURIComponent(titleTextColor)}`;
    }

    if (countTextColor !== '#FFFFFF') {
      badgeUrl += `&count_color=${encodeURIComponent(countTextColor)}`;
    }

    return badgeUrl;
  };

  // Generate code snippets
  const badgeUrl = generateBadgeUrl();
  const markdownCode = badgeUrl ? `[![${title}](${badgeUrl})](${BASE_URL})` : '';
  const htmlCode = badgeUrl ? `<a href="${BASE_URL}"><img src="${badgeUrl}"></a>` : '';

  // Handle copy to clipboard
  const copyToClipboard = (text: string, type: 'markdown' | 'html' | 'url') => {
    navigator.clipboard.writeText(text).then(() => {
      // Show feedback
      setCopyFeedback({ ...copyFeedback, [type]: true });

      // Hide feedback after 2 seconds
      setTimeout(() => {
        setCopyFeedback({ ...copyFeedback, [type]: false });
      }, 2000);
    });
  };

  // Validate URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const urlError = url && !isValidUrl(url) ? 'Please enter a valid URL' : '';

  return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Badge Generator</h1>
          <a href={BASE_URL}>
            <img src={`${BASE_URL}/api/hit?url=${BASE_URL}&title=hits&count_bg=%234CAF50`} />
          </a>
        </div>

        {/* URL Input */}
        <div className={styles.formGroup}>
          <label htmlFor="url" className={styles.label}>
            Target URL
          </label>
          <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className={styles.input}
          />
          {urlError && <p className={styles.error}>{urlError}</p>}
        </div>

        {/* Customization Options */}
        <div className={styles.grid}>
          {/* Border Style */}
          <div>
            <label htmlFor="border" className={styles.label}>
              Border Style
            </label>
            <select
                id="border"
                value={border}
                onChange={(e) => setBorder(e.target.value as 'ROUND' | 'SQUARE' | 'NONE')}
                className={styles.input}
            >
              <option value="ROUND">Round</option>
              <option value="SQUARE">Square</option>
              <option value="NONE">None</option>
            </select>
          </div>

          {/* Display Mode */}
          <div>
            <label htmlFor="displayMode" className={styles.label}>
              Display Mode
            </label>
            <select
                id="displayMode"
                value={displayMode}
                onChange={(e) => setDisplayMode(e.target.value as 'BOTH' | 'TOTAL' | 'DAILY')}
                className={styles.input}
            >
              <option value="BOTH">Daily / Total</option>
              <option value="TOTAL">Total Only</option>
              <option value="DAILY">Daily Only</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="hits"
                className={styles.input}
            />
          </div>

          {/* Title Background Color */}
          <div>
            <label htmlFor="titleBgColor" className={styles.label}>
              Title Background Color
            </label>
            <div className={styles.flexRow}>
              <input
                  type="text"
                  id="titleBgColor"
                  value={titleBgColor}
                  onChange={(e) => setTitleBgColor(e.target.value)}
                  className={styles.inputWithColor}
              />
              <input
                  type="color"
                  value={titleBgColor}
                  onChange={(e) => setTitleBgColor(e.target.value)}
                  className={styles.colorPicker}
              />
            </div>
          </div>

          {/* Title Text Color */}
          <div>
            <label htmlFor="titleTextColor" className={styles.label}>
              Title Text Color
            </label>
            <div className={styles.flexRow}>
              <input
                  type="text"
                  id="titleTextColor"
                  value={titleTextColor}
                  onChange={(e) => setTitleTextColor(e.target.value)}
                  className={styles.inputWithColor}
              />
              <input
                  type="color"
                  value={titleTextColor}
                  onChange={(e) => setTitleTextColor(e.target.value)}
                  className={styles.colorPicker}
              />
            </div>
          </div>

          {/* Count Background Color */}
          <div>
            <label htmlFor="countBgColor" className={styles.label}>
              Count Background Color
            </label>
            <div className={styles.flexRow}>
              <input
                  type="text"
                  id="countBgColor"
                  value={countBgColor}
                  onChange={(e) => setCountBgColor(e.target.value)}
                  className={styles.inputWithColor}
              />
              <input
                  type="color"
                  value={countBgColor}
                  onChange={(e) => setCountBgColor(e.target.value)}
                  className={styles.colorPicker}
              />
            </div>
          </div>

          {/* Count Text Color */}
          <div>
            <label htmlFor="countTextColor" className={styles.label}>
              Count Text Color
            </label>
            <div className={styles.flexRow}>
              <input
                  type="text"
                  id="countTextColor"
                  value={countTextColor}
                  onChange={(e) => setCountTextColor(e.target.value)}
                  className={styles.inputWithColor}
              />
              <input
                  type="color"
                  value={countTextColor}
                  onChange={(e) => setCountTextColor(e.target.value)}
                  className={styles.colorPicker}
              />
            </div>
          </div>
        </div>

        {/* Badge Preview */}
        <div className={styles.previewContainer}>
          <h2 className={styles.previewTitle}>Badge Preview</h2>
          <div className={styles.previewBox}>
            {badgeUrl ? (
                <img src={badgeUrl} alt="Badge Preview" />
            ) : (
                <p className={styles.previewPlaceholder}>Enter a valid URL to see the badge preview</p>
            )}
          </div>
        </div>

        {/* Generated Code */}
        {badgeUrl && (
            <div className={styles.codeSection}>
              <h2 className={styles.codeTitle}>Generated Code</h2>

              {/* Markdown */}
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <h3 className={styles.codeType}>Markdown</h3>
                  <button
                      onClick={() => copyToClipboard(markdownCode, 'markdown')}
                      className={styles.copyButton}
                  >
                    {copyFeedback.markdown ? '✅ Copied' : 'Copy'}
                  </button>
                </div>
                <pre className={styles.pre}>
              {markdownCode}
            </pre>
              </div>

              {/* HTML */}
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <h3 className={styles.codeType}>HTML</h3>
                  <button
                      onClick={() => copyToClipboard(htmlCode, 'html')}
                      className={styles.copyButton}
                  >
                    {copyFeedback.html ? '✅ Copied' : 'Copy'}
                  </button>
                </div>
                <pre className={styles.pre}>
              {htmlCode}
            </pre>
              </div>

              {/* URL */}
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <h3 className={styles.codeType}>Embed URL</h3>
                  <button
                      onClick={() => copyToClipboard(badgeUrl, 'url')}
                      className={styles.copyButton}
                  >
                    {copyFeedback.url ? '✅ Copied' : 'Copy'}
                  </button>
                </div>
                <pre className={styles.pre}>
              {badgeUrl}
            </pre>
              </div>
            </div>
        )}
      </div>
  );
};

export default BadgeGenerator;
