"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/context/locale-context";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";

// Define supported language codes as a type
type SupportedLanguage = "en" | "zh" | "hi" | "ja" | "ko";

// Translation Data
const translations = {
  en: {
    title: "General Settings",
    description: "Configure system-wide settings that apply to all users in",
    systemPrompt: "System Prompt",
    systemPromptPlaceholder: "Enter a system-level prompt...",
    furtherPersonalization: "Further Personalization",
    furtherPersonalizationPlaceholder: "Enter additional customization options...",
    save: "Save Settings",
    saving: "Saving...",
    saved: "Saved",
    loading: "Loading settings...",
  },
  zh: {
    title: "通用设置",
    description: "配置适用于所有用户的系统范围设置",
    systemPrompt: "系统提示",
    systemPromptPlaceholder: "输入系统级提示...",
    furtherPersonalization: "进一步个性化",
    furtherPersonalizationPlaceholder: "输入额外的自定义选项...",
    save: "保存设置",
    saving: "保存中...",
    saved: "已保存",
    loading: "加载设置中...",
  },
  hi: {
    title: "सामान्य सेटिंग्स",
    description: "सभी उपयोगकर्ताओं पर लागू होने वाली सिस्टम सेटिंग्स को कॉन्फ़िगर करें",
    systemPrompt: "सिस्टम संकेत",
    systemPromptPlaceholder: "सिस्टम-स्तरीय संकेत दर्ज करें...",
    furtherPersonalization: "अतिरिक्त वैयक्तिकरण",
    furtherPersonalizationPlaceholder: "अतिरिक्त अनुकूलन विकल्प दर्ज करें...",
    save: "सेटिंग्स सहेजें",
    saving: "सहेजा जा रहा है...",
    saved: "सहेजा गया",
    loading: "सेटिंग्स लोड हो रही हैं...",
  },
  ja: {
    title: "一般設定",
    description: "すべてのユーザーに適用されるシステム設定を構成します",
    systemPrompt: "システムプロンプト",
    systemPromptPlaceholder: "システムレベルのプロンプトを入力してください...",
    furtherPersonalization: "さらなるパーソナライゼーション",
    furtherPersonalizationPlaceholder: "追加のカスタマイズオプションを入力してください...",
    save: "設定を保存",
    saving: "保存中...",
    saved: "保存済み",
    loading: "設定を読み込んでいます...",
  },
  ko: {
    title: "일반 설정",
    description: "모든 사용자에게 적용되는 시스템 설정을 구성합니다",
    systemPrompt: "시스템 프롬프트",
    systemPromptPlaceholder: "시스템 수준 프롬프트 입력...",
    furtherPersonalization: "추가 개인화",
    furtherPersonalizationPlaceholder: "추가 사용자 지정 옵션 입력...",
    save: "설정 저장",
    saving: "저장 중...",
    saved: "저장됨",
    loading: "설정 로드 중...",
  },
};

export default function GeneralSettings() {
  const { currentLanguage } = useLocale();

  // Get the correct translation based on the selected language
  const lang = (currentLanguage?.code || "en") as SupportedLanguage;
  const t = translations[lang] || translations.en;

  const [settings, setSettings] = useState({
    systemPrompt: "",
    furtherPersonalization: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // Simulate loading settings
    setTimeout(() => {
      setSettings({
        systemPrompt: `${t.systemPrompt} - Example`,
        furtherPersonalization: `${t.furtherPersonalization} - Example`,
      });
      setIsLoading(false);
    }, 800);
  }, [t]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#003750]">{t.title}</CardTitle>
          <CardDescription>{t.loading}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 size={30} className="animate-spin text-[#0083BF]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#003750]">{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="systemPrompt" className="text-sm font-medium text-[#003750]">
            {t.systemPrompt}
          </label>
          <Textarea
            id="systemPrompt"
            name="systemPrompt"
            value={settings.systemPrompt}
            onChange={handleInputChange}
            placeholder={t.systemPromptPlaceholder}
            className="min-h-[120px] border-[#b8e2f2] focus-visible:ring-[#0083BF]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="furtherPersonalization" className="text-sm font-medium text-[#003750]">
            {t.furtherPersonalization}
          </label>
          <Textarea
            id="furtherPersonalization"
            name="furtherPersonalization"
            value={settings.furtherPersonalization}
            onChange={handleInputChange}
            placeholder={t.furtherPersonalizationPlaceholder}
            className="min-h-[120px] border-[#b8e2f2] focus-visible:ring-[#0083BF]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="bg-[#0083BF] hover:bg-[#0077ae] text-white">
          {isSaving ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              {t.saving}
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle size={16} className="mr-2" />
              {t.saved}
            </>
          ) : (
            <>
              {t.save}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}