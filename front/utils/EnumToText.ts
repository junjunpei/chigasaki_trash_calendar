import { TrashName } from '../domain/entity/Trash';

export class EnumToText {
  static trashNameEnumToText(trashName: TrashName | string) {
    switch (trashName) {
      case TrashName.Clothes:
        return '衣類・布類';
      case TrashName.Plastic:
        return 'プラスチック製容器包装類';
      case TrashName.Burnable:
        return '燃やせるごみ';
      case TrashName.BottolesAndOil:
        return 'びん・かん・ペットボトル\n廃食用油・金属油';
      case TrashName.Unburnable:
        return '燃やせないごみ';
      case TrashName.Paper:
        return '古紙類';
      case TrashName.Nothing:
        return '収集なし';
    }
  }
}