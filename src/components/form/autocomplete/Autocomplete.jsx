import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useControl } from "../../../hooks";
import "./Autocomplete.css";

const AutocompleteComponent = (props, ref) => {
  const control = useControl(props.name, props.props, props.parent);
  useImperativeHandle(ref, () => control);

  const [state, setState] = useState({
    isShow: false,
  });

  return (
    <>
      <Dropdown show={state.isShow}>
        <Dropdown.Toggle
          as={CustomToggle}
          onClick={() => {
            setState((state) => ({
              ...state,
              isShow: !state.isShow,
            }));
          }}
        >
          {control.value.name || props.placeholder || ""}
        </Dropdown.Toggle>

        <Dropdown.Menu
          as={CustomMenu}
          searchPlaceholder={props.searchPlaceholder}
          stringUrl={props.stringUrl}
          onChoose={(option) => {
            control.setValue(option);
            setState((state) => ({
              ...state,
              isShow: false,
            }));
          }}
        ></Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const CustomMenu = forwardRef(
  ({ className, onChoose, searchPlaceholder, stringUrl }, ref) => {
    const [state, setState] = useState({
      keywords: "",
      options: [],
      timeout: undefined,
    });

    const [request, setRequest] = useState({
      perPage: 7,
      currentPage: 1,
      isLoading: false,
      isLastRecord: false,
      keywords: "",
    });

    useEffect(() => {
      fetchOptions();
    }, [request.currentPage, request.keywords]);

    const fetchOptions = async () => {
      let query = `_page=${request.currentPage}&_limit=${request.perPage}`;
      if (request.keywords) {
        query += `&q=${request.keywords}`;
      }

      const response = await fetch(
        `http://localhost:3001${stringUrl}?${query}`
      );
      const result = await response.json();
      setState((state) => ({
        ...state,
        options: [...state.options, ...(result || [])],
      }));
      setRequest((request) => ({
        ...request,
        isLoading: false,
        isLastRecord: (result || []).length < request.perPage,
      }));
    };

    const handleScroll = (e) => {
      const { clientHeight, scrollHeight, scrollTop } = e.target;
      const isScrollend = Math.ceil(clientHeight + scrollTop) === scrollHeight;
      if (isScrollend && !request.isLastRecord) {
        setRequest((request) => ({
          ...request,
          currentPage: request.currentPage + 1,
          isLoading: true,
        }));
      }
    };

    const handleSearch = (e) => {
      clearTimeout(state.timeout);
      const keywords = e.target.value;
      setState((state) => ({
        ...state,
        keywords,
      }));
      state.timeout = setTimeout(() => {
        setState((state) => ({
          ...state,
          options: [],
        }));
        setRequest((request) => ({
          ...request,
          keywords,
          currentPage: 1,
          isLoading: true,
        }));
      }, 1000);
    };

    return (
      <div className={"auto-complete " + className} ref={ref}>
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder={searchPlaceholder || "Cari..."}
          onChange={handleSearch}
          value={state.keywords}
        />
        <ul className="list" onScroll={handleScroll}>
          {state.options.map((option, index) => (
            <li
              className="list-item"
              key={index}
              onClick={() => onChoose(option)}
            >
              {option.name}
            </li>
          ))}
          {!request.isLoading && state.options.length === 0 ? (
            <li className="list-item not-found">Data tidak ditemukan</li>
          ) : null}
        </ul>
      </div>
    );
  }
);

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    className="form-control cursor-pointer d-flex justify-content-between align-items-center"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <span className="text">{children}</span>
    <em className="fas fa-chevron-down"></em>
  </div>
));

export const Autocomplete = forwardRef(AutocompleteComponent);
