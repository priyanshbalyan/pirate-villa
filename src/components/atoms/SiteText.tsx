'use client';

import useGetTexts, { getTextsQueryKey } from "~/hooks/useGetTexts"
import { Input } from "~/components/ui/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import updateTexts from "~/hooks/useUpdateTexts";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "~/hooks/use-toast";
import { LoaderCircle } from "lucide-react";

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
  const [textState, setTextState] = useState<TextMap>({})
  const [errors, setErrors] = useState('')

  const { toast } = useToast()

  const queryClient = useQueryClient()

  useEffect(() => {
    if (texts) setTextState(texts)
  }, [texts])

  const textList = useMemo(() => Object.entries(textState || {}).map(([text, textContent]) => {
    return { textKey: text, content: textContent, isArray: Array.isArray(textContent) }
  }) ?? [], [textState])

  const handleUpdateClick = async () => {
    try {
      await updateTexts(textState)
      queryClient.invalidateQueries({ queryKey: getTextsQueryKey() })
      toast({ title: 'Texts updated', })
    } catch (err: any) {
      setErrors(err?.message)
    }
  }

  const handleValueChange = useCallback((textKey: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextState({
        ...textState,
        [textKey]: e.target.value
      })
    }
  }, [textState])


  const detectKeyChanges = useMemo(() => Object.keys(getDifferences(texts, textState)).length > 0, [texts, textState])

  if (isLoading) return <LoaderCircle className="animate-spin w-full flex items-center justify-center" />

  return (
    <div className="max-w-[800px] px-4 mx-auto text-site">
      <h1 className="mb-4 text-2xl font-bold">Modify the site text here </h1>
      <p className="text-red-500">{errors}</p>
      {textList.map(text => {
        return (
          <div className="flex" key={text.textKey}>
            <div className="w-3/12">{text.textKey}:</div>
            <div className="w-9/12">
              {Array.isArray(text.content)
                ? text.content.map((cnt, index) => (
                  <Input
                    value={cnt}
                    key={`${text.textKey} ${cnt} ${index}`}
                    onChange={handleValueChange(text.textKey)}
                  />
                ))
                : (
                  <Input
                    className="border-[1px] border-primary"
                    value={text.content}
                    name={text.textKey}
                    onChange={handleValueChange(text.textKey)}
                  />
                )
              }
            </div>
          </div>
        )
      })}
      {detectKeyChanges && <Button onClick={handleUpdateClick}>UPDATE</Button>}
    </div>
  )
}
