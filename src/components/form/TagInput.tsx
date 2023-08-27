"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import slugify from "slug";
import { FaTimes } from "react-icons/fa";
import Wrappar from "./Wrappar";
import Label from "./Label";
import Input from "./Input";
import { cn } from "@/lib/cn";

export interface Tag {
  // value to show the user
  displayValue: string;
  // value to use in the form (hidden input)
  inputValue: string;
}

export interface Props {
  label: string;
  name?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  tags?: Tag[];
  defaultTags?: Tag[];
  onlyFromTags?: boolean;
  customError?: string;
}

export default function TagInput({
  label,
  name,
  className,
  placeholder,
  disabled,
  readOnly,
  autoFocus,
  tags = [],
  defaultTags,
  onlyFromTags,
  customError = "Tag does not exist",
}: Props) {
  const [inputTags, setInputTags] = useState<Tag[]>(defaultTags || []);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Display suggestions when the user types or when the list of `inputTags` changes
  useEffect(() => displaySuggestions(), [inputValue, inputTags]);

  // Display/reset suggestions.
  const displaySuggestions = () => {
    let filteredSuggestions: Tag[] = [];

    // Check if the input is empty
    if (inputValue === "") {
      // Show all suggestions that are not already in the list of `inputTags`
      filteredSuggestions = tags.filter(
        (tag) =>
          !inputTags.some(
            (inputTag) => inputTag.displayValue === tag.displayValue,
          ),
      );
    } else {
      // Show only suggestions that match the input and are not already in the list of `inputTags`
      filteredSuggestions = tags.filter(
        (tag) =>
          tag.displayValue.toLowerCase().indexOf(inputValue.toLowerCase()) >
            -1 &&
          !inputTags.some(
            (inputTag) => inputTag.displayValue === tag.displayValue,
          ),
      );
    }

    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  // check if the tag is in the list of `tags`
  const checkTagExists = (tagDisplayValue: string) => {
    return tags.some((tag) => tag.displayValue === tagDisplayValue);
  };

  // Add the tag when the user presses enter
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // prevent the form from submitting
      e.preventDefault();

      const tagDisplayValue = e.currentTarget.value;

      // Check if the tag exists
      if (onlyFromTags && !checkTagExists(tagDisplayValue)) {
        setError(customError);
        return;
      }

      // Check if the tag is already in the list of `inputTags`
      // If not, add it to the list
      if (
        tagDisplayValue &&
        !inputTags.some((tag) => tag.displayValue === tagDisplayValue)
      ) {
        const newTag: Tag = {
          displayValue: tagDisplayValue,
          inputValue:
            tags.find((tag) => tag.displayValue === tagDisplayValue)
              ?.inputValue || slugify(tagDisplayValue),
        };

        setInputTags([...inputTags, newTag]);
        setInputValue("");
      }
    }

    // remove the error when the user starts typing
    setError("");
  };

  // Show suggestions when the input is focused
  const handleInputFocus = () => {
    displaySuggestions();

    setIsFocused(true);
  };

  // Remove suggestions when the user clicks outside the input
  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (!relatedTarget?.classList.contains("suggestion")) {
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  // remove the tag when the user clicks on it
  const handleTagClick = (tagDisplayValue: string) => {
    const newTags = inputTags.filter(
      (tag) => tag.displayValue !== tagDisplayValue,
    );
    setInputTags(newTags);
  };

  // append the tags when clicking a suggestion
  const handleSuggestionClick = (tagDisplayValue: string) => {
    const newTag: Tag = {
      displayValue: tagDisplayValue,
      inputValue:
        tags.find((tag) => tag.displayValue === tagDisplayValue)?.inputValue ||
        "",
    };

    // Check if the tag already exists
    if (!inputTags.some((tag) => tag.displayValue === newTag.displayValue)) {
      setInputTags([...inputTags, newTag]);
    }

    // reset the input value
    setInputValue("");

    // focus the input after clicking a suggestion
    const input = document.getElementById("tag-input");
    input?.focus();
  };

  return (
    <Wrappar>
      <Label htmlFor={name}>{label}</Label>
      <input
        type="hidden"
        name={name}
        id={name}
        value={inputTags
          .map((tag) => `${tag.displayValue}:${tag.inputValue}`)
          .join(",")}
      />
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {inputTags.map((tag, index) => (
            <button
              type="button"
              key={index}
              className="btn bg-mainColorDark"
              onClick={() => handleTagClick(tag.displayValue)}
            >
              {tag.displayValue}
              <FaTimes />
            </button>
          ))}
        </div>

        <input
          id="tag-input"
          type="text"
          className={cn("input-styles", {
            "border-red-600 focus:border-red-600": error,
          })}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />

        {error && (
          <p className="my-2 text-base font-bold text-red-600">{error}</p>
        )}

        {/* display suggestions only on focus */}
        {suggestions.length > 0 && isFocused && (
          <div className="mt-[0.3rem] flex flex-col  rounded-md bg-bgColorLighter py-2">
            {suggestions.map((tag, index) => (
              <button
                key={index}
                className="suggestion w-full cursor-pointer px-8 py-[0.3rem] text-start text-xl font-bold transition-colors duration-200 ease-in-out hover:bg-bgColorLight max-[1000px]:text-lg max-[600px]:text-base"
                type="button"
                onClick={() => handleSuggestionClick(tag.displayValue)}
              >
                {tag.displayValue}
              </button>
            ))}
          </div>
        )}
      </div>
    </Wrappar>
  );
}
