import "./styles.css";
import React, { forwardRef, useEffect, useRef, useState } from "react";

const FlexBox = () => {
  const [changeWeight, setChangeWeight] = useState<number>(80);
  const [count, setCount] = useState<number>(4);

  const refElemnt = useRef<any>();
  const ForWardCom = forwardRef((props: any, ref: any) => {
    return (
      <div
        key={props.index}
        className="item"
        style={{ width: props.styleWidth }}
        ref={ref}
      >
        <div className="number">{props.index + 1}</div>
        <input title={props.items} placeholder="order" type="text" />
        <input
          title="属性定义项目的放大比例，默认为0"
          placeholder="flex-grow"
          type="text"
        />
        <input
          title="属性定义了项目的缩小比例，默认为1"
          placeholder="flex-shrink"
          type="text"
        />
        <input
          title="属性定义了在分配多余空间之前，项目占据的主轴空间。"
          placeholder="flex-basis"
          type="text"
        />
        <select
          name="align-self"
          title="align-self 允许不一样的对齐方式，可覆盖`align-items`属性"
        >
          <option value="flex-start">flex-start</option>
          <option value="flex-end">flex-end</option>
          <option value="center">center</option>
          <option value="space-between">space-around</option>
          <option value="stretch">stretch</option>
          <option value="auto">auto</option>
        </select>
      </div>
    );
  });

  const ItemTemplate = ({ count }: any) => {
    const arr = new Array(count).fill(0);
    const mapEl = arr.map((item, index) => {
      return (
        <ForWardCom
          key={index}
          index={index}
          items={item}
          styleWidth={`${changeWeight}px`}
        />
      );
    }) as any;
    return mapEl;
  };

  const subItem = () => {
    if (count <= 1) {
      alert("不能再删了！再删玩儿坏了");
      return;
    }
    setCount((c) => c - 1);
  };

  const addItem = () => {
    if (count >= 10) {
      alert("不能再加了！再加挤爆了了");
      return;
    }
    var node = document.createElement("div");
    node.setAttribute("class", "item");
    node.style.width = changeWeight + "px";
    setCount((c) => c + 1);
  };

  const changeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeWeight(Number(e.target.value));
  };

  // 项目属性设置绑定事件

  useEffect(() => {
    const item_body = document.getElementById("item-body") as any;
    //设置容器属性的点击事件
    var options = document.getElementById("options") as any;

    options.addEventListener("click", function (e: any) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      if (target.matches("label")) {
        let rid = document.getElementById(target.getAttribute("for")) as any;
        // 如果没有选中触发的点击改为选中状态
        if (!rid.checked) rid.checked = "checked";
        let val = target.innerText;
        let attributeName = rid.getAttribute("name");
        item_body.style[attributeName] = val;
      }
    });
    // 项目属性设置绑定事件
    const itemChoose = document.getElementById("item-body") as any;
    itemChoose.addEventListener("input", function (e: any) {
      var event = e || window.event;
      var target = event.target || event.srcElement;
      if (target.matches("input") || target.matches("select")) {
        target.parentNode.style[target.placeholder || target.name] =
          target.value;
      }
    });
  }, []);

  return (
    <>
      <h1>Flexbox演示站</h1>
      <div className="box">
        <div id="options">
          {/* flex-direction */}
          <div className="option-item">
            <h2 title="主轴方向">flex-direction</h2>
            <input type="radio" name="flex-direction" id="fd1" defaultChecked />
            <label title="主轴为水平方向，起点在左端" htmlFor="fd1">
              row
            </label>
            <input type="radio" name="flex-direction" id="fd2" />
            <label title="主轴为水平方向，起点在右端" htmlFor="fd2">
              row-reverse
            </label>
            <input type="radio" name="flex-direction" id="fd3" />
            <label title="主轴为水平方向，起点在右端" htmlFor="fd3">
              column
            </label>
            <input type="radio" name="flex-direction" id="fd4" />
            <label title="主轴为垂直方向，起点在下沿" htmlFor="fd4">
              column-reverse
            </label>
          </div>
          {/* flex-wrap */}
          <div className="option-item" id="aaa">
            <h2 title="轴线是否换行">flex-wrap</h2>
            <input type="radio" name="flex-wrap" id="fw1" defaultChecked />
            <label title="（默认）不换行" htmlFor="fw1">
              nowrap
            </label>
            <input type="radio" name="flex-wrap" id="fw2" />
            <label title="换行，第一行在上方" htmlFor="fw2">
              wrap
            </label>
            <input type="radio" name="flex-wrap" id="fw3" />
            <label title="换行，第一行在下方" htmlFor="fw3">
              wrap-reverse
            </label>
          </div>

          {/* justify-content */}
          <div className="option-item">
            <h2 title="定义了项目在主轴上的对齐方式">justify-content</h2>
            <input
              type="radio"
              name="justify-content"
              id="jc1"
              defaultChecked
            />
            <label title="（默认值）：左对齐" htmlFor="jc1">
              flex-start
            </label>
            <input type="radio" name="justify-content" id="jc2" />
            <label title="右对齐" htmlFor="jc2">
              flex-end
            </label>
            <input type="radio" name="justify-content" id="jc3" />
            <label title="居中" htmlFor="jc3">
              center
            </label>
            <input type="radio" name="justify-content" id="jc4" />
            <label title="两端对齐，项目之间的间隔都相等。" htmlFor="jc4">
              space-between
            </label>
            <input type="radio" name="justify-content" id="jc5" />
            <label
              title="每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。"
              htmlFor="jc5"
            >
              space-around
            </label>
          </div>
          {/* align-items */}
          <div className="option-item">
            <h2 title="定义项目在交叉轴上如何对齐">align-items</h2>
            <input type="radio" name="align-items" id="ai1" defaultChecked />
            <label title="交叉轴的起点对齐" htmlFor="ai1">
              flex-start
            </label>
            <input type="radio" name="align-items" id="ai2" />
            <label title="交叉轴的终点对齐" htmlFor="ai2">
              flex-end
            </label>
            <input type="radio" name="align-items" id="ai3" />
            <label title="交叉轴的中点对齐" htmlFor="ai3">
              center
            </label>
            <input type="radio" name="align-items" id="ai4" />
            <label title="项目的第一行文字的基线对齐" htmlFor="ai4">
              baseline
            </label>
            <input type="radio" name="align-items" id="ai5" />
            <label
              title="如果项目未设置高度或设为auto，将占满整个容器的高度"
              htmlFor="ai5"
            >
              stretch
            </label>
          </div>
          {/*   align-content */}
          <div className="option-item">
            <h2 title="定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用">
              align-content
            </h2>
            <input type="radio" name="align-content" id="ac1" defaultChecked />
            <label title="与交叉轴的起点对齐" htmlFor="ac1">
              flex-start
            </label>
            <input type="radio" name="align-content" id="ac2" />
            <label title="与交叉轴的终点对齐" htmlFor="ac2">
              flex-end
            </label>
            <input type="radio" name="align-content" id="ac3" />
            <label title="与交叉轴的中点对齐" htmlFor="ac3">
              center
            </label>
            <input type="radio" name="align-content" id="ac4" />
            <label
              title="与交叉轴两端对齐，轴线之间的间隔平均分布"
              htmlFor="ac4"
            >
              space-between
            </label>
            <input type="radio" name="align-content" id="ac5" />
            <label
              title="每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍"
              htmlFor="ac5"
            >
              space-around
            </label>
            <input type="radio" name="align-content" id="ac6" />
            <label title="轴线占满整个交叉轴" htmlFor="ac6">
              stretch
            </label>
          </div>
        </div>
        <div id="items">
          <div id="item-head">
            <div>
              <span>
                项目数量：
                <span id="count">{count}</span>
              </span>
              <button onClick={addItem}>+</button>
              <button onClick={subItem}>-</button>
            </div>
            <div>
              <span style={{ display: "inlineBlock", width: "150px" }}>
                项目宽度：
                <span id="itemWidth">{changeWeight}</span>px
              </span>
              <input
                onChange={changeCallback}
                id="widthRange"
                type="range"
                name="points"
                min="50"
                max="250"
                value={changeWeight}
              />
            </div>
          </div>
          <div id="item-body" ref={refElemnt}>
            <ItemTemplate count={count} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FlexBox;
