'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

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
      <div className={`p-6 max-w-4xl mx-auto ${className}`}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Badge Generator</h1>
          <a href={BASE_URL}>
            <img src={`${BASE_URL}/api/hit?url=${BASE_URL}&title=hits&count_bg=%234CAF50`} />
          </a>
        </div>

        {/* URL Input */}
        <div className="grid w-full items-center gap-2 mb-6">
          <Label htmlFor="url">
            Target URL
          </Label>
          <Input type="text"
                 id="url"
                 value={url}
                 onChange={(e) => setUrl(e.target.value)}
                 placeholder="https://github.com/username/repo"
          />
          {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
        </div>

        {/* Customization Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Border Style */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="border-select">
              Border Style
            </Label>
            <Select value={border} onValueChange={(value) => setBorder(value as 'ROUND' | 'SQUARE' | 'NONE')}>
              <SelectTrigger id="border-select" className="w-full">
                <SelectValue placeholder="Border Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Border Style</SelectLabel>
                  <SelectItem value="ROUND">Round</SelectItem>
                  <SelectItem value="SQUARE">Square</SelectItem>
                  <SelectItem value="NONE">None</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Display Mode */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="display-mode-select">
              Display Mode
            </Label>
            <Select value={displayMode}
                    onValueChange={(value) => setDisplayMode(value as 'BOTH' | 'TOTAL' | 'DAILY')}
            >
              <SelectTrigger id="display-mode-select" className="w-full">
                <SelectValue placeholder="Display Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Display Mode</SelectLabel>
                  <SelectItem value="BOTH">Daily / Total</SelectItem>
                  <SelectItem value="TOTAL">Total Only</SelectItem>
                  <SelectItem value="DAILY">Daily Only</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="title">
              Title
            </Label>
            <Input type="text"
                   id="title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="hits"
            />
          </div>

          {/* Title Background Color */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="titleBgColor">
              Title Background Color
            </Label>
            <div className="flex">
              <Input
                type="text"
                id="titleBgColor"
                value={titleBgColor}
                onChange={(e) => setTitleBgColor(e.target.value)}
                className="rounded-r-none"
              />
              <div className="flex items-center justify-center h-9 w-9 border border-input border-l-0 rounded-r-md bg-background overflow-hidden">
                <input
                  type="color"
                  value={titleBgColor}
                  onChange={(e) => setTitleBgColor(e.target.value)}
                  className="h-9 w-9"
                  aria-labelledby="titleBgColor"
                />
              </div>
            </div>
          </div>

          {/* Title Text Color */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="titleTextColor">
              Title Text Color
            </Label>
            <div className="flex">
              <Input
                type="text"
                id="titleTextColor"
                value={titleTextColor}
                onChange={(e) => setTitleTextColor(e.target.value)}
                className="rounded-r-none"
              />
              <div className="flex items-center justify-center h-9 w-9 border border-input border-l-0 rounded-r-md bg-background overflow-hidden">
                <input
                  type="color"
                  value={titleTextColor}
                  onChange={(e) => setTitleTextColor(e.target.value)}
                  className="h-9 w-9"
                  aria-labelledby="titleTextColor"
                />
              </div>
            </div>
          </div>

          {/* Count Background Color */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="countBgColor">
              Count Background Color
            </Label>
            <div className="flex">
              <Input
                type="text"
                id="countBgColor"
                value={countBgColor}
                onChange={(e) => setCountBgColor(e.target.value)}
                className="rounded-r-none"
              />
              <div className="flex items-center justify-center h-9 w-9 border border-input border-l-0 rounded-r-md bg-background overflow-hidden">
                <input
                  type="color"
                  value={countBgColor}
                  onChange={(e) => setCountBgColor(e.target.value)}
                  className="h-9 w-9"
                  aria-labelledby="countBgColor"
                />
              </div>
            </div>
          </div>

          {/* Count Text Color */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="countTextColor">
              Count Text Color
            </Label>
            <div className="flex">
              <Input
                type="text"
                id="countTextColor"
                value={countTextColor}
                onChange={(e) => setCountTextColor(e.target.value)}
                className="rounded-r-none"
              />
              <div className="flex items-center justify-center h-9 w-9 border border-input border-l-0 rounded-r-md bg-background overflow-hidden">
                <input
                  type="color"
                  value={countTextColor}
                  onChange={(e) => setCountTextColor(e.target.value)}
                  className="w-9 h-9"
                  aria-labelledby="countTextColor"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Badge Preview */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Badge Preview</h2>
          <div className="p-4 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center">
            {badgeUrl ? (
                <img src={badgeUrl} alt="Badge Preview" />
            ) : (
                <p className="text-gray-500">Enter a valid URL to see the badge preview</p>
            )}
          </div>
        </div>

        {/* Generated Code */}
        {badgeUrl && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Generated Code</h2>

              {/* Markdown */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">Markdown</h3>
                  <Button
                      variant="default"
                      size="sm"
                      onClick={() => copyToClipboard(markdownCode, 'markdown')}
                  >
                    {copyFeedback.markdown ? '✅ Copied' : 'Copy'}
                  </Button>
                </div>
                <pre className="p-3 bg-gray-100 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
                  {markdownCode}
                </pre>
              </div>

              {/* HTML */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">HTML</h3>
                  <Button
                      variant="default"
                      size="sm"
                      onClick={() => copyToClipboard(htmlCode, 'html')}
                  >
                    {copyFeedback.html ? '✅ Copied' : 'Copy'}
                  </Button>
                </div>
                <pre className="p-3 bg-gray-100 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
                  {htmlCode}
                </pre>
              </div>

              {/* URL */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-medium">Embed URL</h3>
                  <Button
                      variant="default"
                      size="sm"
                      onClick={() => copyToClipboard(badgeUrl, 'url')}
                  >
                    {copyFeedback.url ? '✅ Copied' : 'Copy'}
                  </Button>
                </div>
                <pre className="p-3 bg-gray-100 rounded-md overflow-x-auto whitespace-pre-wrap break-all">
                  {badgeUrl}
                </pre>
              </div>
            </div>
        )}
      </div>
  );
};

export default BadgeGenerator;
