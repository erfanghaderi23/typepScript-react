
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { Modal } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { Ipeople } from '../App';

interface IProps {
  peoples: Ipeople[];
  setPeoples: Dispatch<SetStateAction<Ipeople[]>>;
  people: Ipeople;
}

const Edit: FC<IProps> = ({ people, peoples, setPeoples }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(people.fullName);
  const [age, setAge] = useState<string | number>(people.age);
  const [img_url, setImg_url] = useState<string>(people.img_url);
  const [bio, setBio] = useState<string | undefined>(people.bio);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!fullName) {
      return alert("نام و نام خانوادگی الزامی می باشد");
    }

    if (!age) {
      return alert("سن الزامی می باشد");
    }

    if (!img_url) {
      return alert("آدرس تصویر الزامی می باشد");
    }

    const persons = [...peoples];
    const index: number = persons.findIndex((p) => p.id === people.id);
    persons[index] = {
      id: people.id,
      fullName,
      age: Number(age),
      img_url,
      bio,
    };
    setPeoples(persons);
    setIsShowModal(false)
  };

  return (
    <>
      <FaUserEdit
        className="text-primary m-1"
        onClick={() => setIsShowModal(true)}
        size={30}
      />

      <Modal
        size="lg"
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>{people.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            autoComplete="off"
            onSubmit={(e) => handleSubmit(e)}
            className="mt-3"
          >
            <input
              type="text"
              className="form-control mb-2"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="نام و نام خانوادگی"
            />
            <input
              type="number"
              className="form-control mb-2"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="سن"
            />
            <input
              type="text"
              className="form-control mb-2"
              name="img_url"
              value={img_url}
              onChange={(e) => setImg_url(e.target.value)}
              placeholder="آدرس تصویر پروفایل"
            />
            <textarea
              className="form-control mb-2"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={7}
              placeholder="بیوگرافی"
            />
            <button type="submit" className="btn btn-success">
              ویرایش شخص
            </button>
            <button
              type="button"
              onClick={() => setIsShowModal(false)}
              className="btn btn-danger me-2"
            >
              بستن
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Edit;