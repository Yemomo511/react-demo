export type Flags = number;

//集中副作用的定义，采用2进制表示
//缺少就补

/**
 * 在JavaScript和TypeScript中，|= 是一个位运算赋值操作符，它执行按位或（bitwise OR）操作并赋值。

 * 这是它的工作方式：

 * 它首先将左操作数和右操作数转换为32位二进制数。
 * 然后，它对这两个二进制数执行按位或操作。按位或操作的规则是，如果两个相应的二进制位中至少有一个为1，则结果为1，否则为0。
 * 最后，它将结果赋值给左操作数。
 * 例如，假设fiber.flags的值为2（在二进制中为10），并且Placement的值为1（在二进制中为01）。那么fiber.flags |= Placement;将fiber.flags的值更新为3（在二进制中为11）。
 *
 * 
 * 例如fiber.flags == NoFlags 现在执行 fiber.flags |= Placement 为 0x00000011
 * 现在有一个更新操作 fiber.flags |= Update 为 0x00000111 
 * 处理时读位即可
 * 
 */
export const NoFlags = /*                      */ 0b0000000;
export const Placement = /*                    */ 0b0000001;
export const Update = /*                       */ 0b0000010;
export const PlacementAndUpdate = /*           */ 0b0000100;
export const Deletion = /*                     */ 0b0001000;
export const MutationMask = Placement | Update | Deletion;
