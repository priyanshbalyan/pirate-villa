'use client';

import useGetTexts, { getTextsQueryKey } from "~/hooks/useGetTexts"
import { Input } from "~/components/ui/input";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import updateTexts from "~/hooks/useUpdateTexts";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "~/hooks/use-toast";
import { LoaderCircle, Trash2 } from "lucide-react";
import useGetImages, { getImagesQueryKey } from "~/hooks/useGetImages";
import { cn } from "~/lib/utils";
import { getHeaders } from "~/utils/utils";
import SafeImage from "../widgets/SafeImage";

type TextMap = { [key: string]: string | string[]; }

function getDifferences(obj1: TextMap | undefined, obj2: TextMap | undefined): Partial<TextMap> {
  if (!obj1 || !obj2) return {}
  const differences: Partial<TextMap> = {};

  for (const key of Object.keys(obj1)) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    if (Array.isArray(val1) && Array.isArray(val2)) {
      // Compare arrays
      if (val1.length !== val2.length || val1.some((v, i) => v !== val2[i])) {
        differences[key] = val2;
      }
    } else if (val1 !== val2) {
      // Compare strings or mismatched types
      differences[key] = val2;
    }
  }

  return differences;
}

export default function SiteText() {
  const { data: texts, isLoading } = useGetTexts()
  const { data: images, } = useGetImages()

  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [textState, setTextState] = useState<TextMap>({})
  const [errors, setErrors] = useState('')
  const [currentlyEditing, setCurrentlyEditing] = useState('')

  useEffect(() => {
    if (texts) setTextState(texts)
  }, [texts])

  const textList = useMemo(() => Object.entries(textState || {}).map(([text, textContent]) => {
    return { textKey: text, content: textContent, isArray: Array.isArray(textContent) }
  }) ?? [], [textState])

  const handleUpdateClick = async () => {
    try {
      await updateTexts(getDifferences(texts, textState) as TextMap)
      queryClient.invalidateQueries({ queryKey: getTextsQueryKey() })
      toast({ title: 'Texts updated', })
    } catch (err: any) {
      setErrors(err?.message)
    }
  }

  const handleValueChange = useCallback((textKey: string, index?: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentlyEditing(textKey)
      if (index) {
        const value = Array.isArray(textState[textKey]) ? textState[textKey] : [textState[textKey]]
        const newValue = [...value.slice(0, index), e.target.value, ...value.slice(index + 1)]
        setTextState({
          ...textState,
          [textKey]: newValue
        })
      }
      else {
        setTextState({
          ...textState,
          [textKey]: e.target.value
        })
      }
    }
  }, [textState])

  const handleAddField = (key: string) => {
    return () => {
      setTextState({
        ...textState,
        [key]: Array.isArray(textState[key]) ? [...(textState[key] ?? []), ''] : [textState[key]]
      })
    }
  }

  const handleRemoveField = (key: string) => {
    const newArray = [...(Array.isArray(textState[key]) ? textState[key] : [])]
    newArray.pop()
    return () => {
      setTextState({
        ...textState,
        [key]: newArray
      })
    }
  }

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({ title: 'Please select a file to upload.' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: getHeaders()
      });

      const result = await res.json();
      if (res.ok) {
        toast({ title: `File uploaded successfully: ${result.fileName}` });
        queryClient.invalidateQueries({ queryKey: getImagesQueryKey() })
      } else {
        toast({ title: `Upload failed: ${result.message}` });
      }
    } catch (error) {
      toast({ title: 'An error occurred while uploading the file.' });
    }
  };

  const handleImageClick = (image: string) => {
    return () => {
      navigator.clipboard.writeText(image)
      toast({ title: 'Text copied to clipboard' })
    }
  }

  const detectKeyChanges = useMemo(() => Object.keys(getDifferences(texts, textState)).length > 0, [texts, textState])

  if (isLoading) return <LoaderCircle className="animate-spin w-full flex items-center justify-center" />

  const updateButton = detectKeyChanges && <Button onClick={handleUpdateClick} className="">UPDATE</Button>

  return (
    <div className=" px-4 mx-auto text-site flex">
      <div className="w-1/2 h-full ">
        <h1 className="mb-4 text-2xl font-bold">Modify the site text here </h1>
        <p className="text-red-500">{errors}</p>
        {textList.map(text => {
          return (
            <div className="flex mb-1 gap-2 text-sm" key={text.textKey}>
              <div className="w-3/12 break-all">{text.textKey}:</div>
              <div className={cn(currentlyEditing === text.textKey ? "w-7/12" : "w-9/12")}>
                {Array.isArray(text.content)
                  ? (
                    <div className="mb-4">
                      {text.content.map((cnt, index) => (
                        <Input
                          value={cnt}
                          key={`${text.textKey}`}
                          onChange={handleValueChange(text.textKey, index)}
                          className="mb-1 border-[1px] border-primary"
                          placeholder="Empty field"
                        />
                      ))}
                      <div className="flex gap-2">
                        <Button onClick={handleAddField(text.textKey)}>Add Item</Button>
                        <Button onClick={handleRemoveField(text.textKey)}>Remove Item</Button>
                      </div>
                    </div>
                  ) : (
                    <Input
                      className="border-[1px] border-primary"
                      value={text.content}
                      name={text.textKey}
                      onChange={handleValueChange(text.textKey)}
                      placeholder="Empty field"
                      key={text.textKey}
                    />
                  )
                }
              </div>
              <div className={cn(currentlyEditing === text.textKey ? "w-2/12" : "w-0/12")}>
                {currentlyEditing === text.textKey && updateButton}
              </div>
            </div>
          )
        })}

      </div>
      <div className="w-1/2 px-4">
        <div className="  h-[600px] overflow-y-scroll">
          <div className="grid grid-cols-4 gap-2">
            {images?.map((image, index) => (<div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg group"
              onClick={handleImageClick(image)}
            >
              <div className="aspect-w-3 aspect-h-2">
                <SafeImage
                  src={image}
                  alt={image}
                  width={200}
                  height={200}
                  className="h-[200px] transition-transform duration-300 ease-in-out group-hover:scale-110 object-cover shadow-lg bg-gray-400 dark:bg-slate-700"
                  quality={40}
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 ease-in-out" />
              <div className="cursor-pointer absolute top-0 right-0 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => { }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="cursor-pointer absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <h2 className={cn("text-xs font-semibold")}>{image}</h2>
                <p className={cn("text-[10px] ")}>Click to copy link</p>
              </div>
            </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleUpload} className="mt-4">
          <div className="flex gap-2">
            <Input className="border-[1px] border-primary" type="file" accept="image/*" onChange={handleFileChange} />
            <Button type="submit">Upload File</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
