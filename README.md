# dark-and-darker-damage-calculater

## How to use it online 如何使用網頁版

🔽點擊連結即可使用🔽

[Dark and Darker 傷害計算器網頁版](<https://jhskrt.github.io/dark-and-darker-damage-calculater/>)

## How to download 如何下載
點擊右側 Releases 下載最新版本的 dndDmgCalculater

下載完成後打開程式即可使用

![image](https://github.com/user-attachments/assets/adbdc135-bcac-4e90-9cde-0ecd506b143c)


## How to use 如何使用
在對應的輸入欄位輸入數值並按下 "計算" 按鈕即可獲得結果

> [!warning]
> 若無法輸入小數點，請切換輸入法再試試看

## Input explanation 輸入欄位解釋

> [!IMPORTANT]
> 物理強度加成、護甲穿透以及傷害減免欄位請輸入小數

`武器傷害(Weapon Damage)`： 武器的基礎傷害 + 天賦給的武器傷害(詩人西洋劍精通、戰歌、野蠻人斧頭專精等等)

`受擊部位(Hit Location)`： 打頭造成 1.5x 、身體 1.0x 、手臂0.8x 、腿0.6x 、手/腳 0.5x 傷害

`物理/魔法強度加成(Physical Power Bonus)`： 可以直接由角色細則查看，由力量/意志、物理/魔法強度和物理/魔法傷害加成影響

 - 物理強度與物理強度加成的關係參考下圖 [物理強度 wiki](<https://darkanddarker.wiki.spellsandguns.com/Stats#Physical_Power>)

![image](https://github.com/user-attachments/assets/7adae393-d79c-40ad-9918-6da0c4c36cb2)

 - 魔法強度與魔法強度加成的關係參考下圖 [魔法強度 wiki](<https://darkanddarker.wiki.spellsandguns.com/Stats#Magical_Power>)

![image](https://github.com/user-attachments/assets/fa1396af-2520-4f95-bd8f-cdd381bf7f89)

`額外/真實物理(魔法)傷害(Additional/True Damage)`： 裝備詞條提供的額外/真實傷害

`護甲/魔法穿透(Armor/Magic Penetration)`： 裝備詞條提供的護甲/魔法穿透

`額外武器傷害(Addition Weapon Damage)`： 武器詞條提供的額外武器傷害

`物理傷害減免/魔法抗性(Physical Damage Reduction/Magic Resistance)`： 由護甲值和裝備詞條決定的物理傷害減免，可以直接由角色細則查看，護甲值：傷害減免請參考 [護甲值 wiki](<https://darkanddarker.wiki.spellsandguns.com/Stats#Armor_Rating>)

> [!note]
> 假人(Dummy)的物抗是-12% 魔抗-20%，其他怪物雙防請參考 [怪物 wiki](https://darkanddarker.wiki.spellsandguns.com/Monsters#Dummy)

## Damage Formula 傷害公式
```
(
  (
    (
        + (Base Damage + Buff Weapon Damage) * Combo Multiplier * Impact Zone Multiplier
        + Gear Weapon Damage|Magical Damage
        + Divine Strike Damage
    )
    * (1 + Power Bonus)
    + Additional Damage
  )
  * (1 + Hit Location Bonus)
  * (1 + Race Damage Bonus)
  * (1 - Race Damage Reduction)
  * (1 - Damage Reduction * (1 + Damage Reduction Mod) * (1 - Penetration))
  * (1 - Projectile Reduction)
)
* Projectile Falloff
+ True Damage
```
```
(
  (
    (
        + (基礎傷害 + 有關武器傷害的增益) * 連擊加乘 * 武器打擊區域加乘
        + 額外武器傷害|額外魔法武器傷害
        + 神擊(牧師法術)傷害
    )
    * (1 + 物理(魔法)強度加成)
    + 額外物理(魔法)傷害
  )
  * (1 + 四肢傷害加成)
  * (1 + 種族(不死族and惡魔)傷害加成)
  * (1 - 種族(不死族and惡魔)傷害減免)
  * (1 - 物理(魔法)傷害減免 * (1 + 物理(魔法)傷害減免模組) * (1 - 護甲(魔法)穿透))
  * (1 - 飛行物傷害減免)
)
* 飛行物傷害衰減
+ 真實物理魔法傷害
```
> [!note]
> 此公式為 wiki 提供，與遊戲內翻譯不同，各變數解釋請參考 wiki

[傷害公式 wiki](<https://darkanddarker.wiki.spellsandguns.com/Damage>)

## You must know 須知

1. 此計算器尚不支援計算混傷類型的武器，即魔法武器傷害，如:魔鬼的喜悅、水晶劍等等

2. 遊戲中當你攻擊假人(Dummy)時，傷害始終無條件捨去小數點，在玩家頁面上則始終四捨五入，小於1的數會無條件顯示1 [四捨五入 wiki](<https://darkanddarker.wiki.spellsandguns.com/Damage#Rounding>)

## Source 資料來源

以上資料皆來自 https://darkanddarker.wiki.spellsandguns.com/Dark_and_Darker_Wiki

## QnA

Q1 : 我有發現問題或建議該如何反應

A1 : 歡迎發 Issues 討論



Q2 : 算出來的傷害怎麼會有小數點?

A2 : 遊戲內傷害跟生命都有小數點，只是顯示會取整數而已，生命值無條件進位，假人傷害無條件捨去，請參考 [四捨五入 wiki](<https://darkanddarker.wiki.spellsandguns.com/Damage#Rounding>)



Q3 : 參考了 Q2 但算出來還是錯的阿

A3 : 那應該是我寫錯了，本程式並沒有經過嚴謹的驗算和證實，如有誤歡迎提 Issues 討論
