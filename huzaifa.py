import unittest


class GroceryListItem:
    """
    This  class is used for Items in a grocery list.
    Attributes
    ----------
    item_name: str  Name of the Item
    item_category: str  Category that item belongs to
    item_quantity: int  Number of items to be bought
    item_current_status:str Current status of item at home
    item_price: float Price of each item for individual person
    Methods
    ___
    _init_(): This method instantiates class attributes as a constructor
    __get_item_price(self): This is a private method used to calculate price
    by each person sharing the apartment. In this case it's between 3 people.
    get_current_st(self): This method fetches the current status of item
     initiated.
    set_current_st(self, current_status): This method changes the current
    status of item initiated and changes that.
    _repr_(self):To compute the “official” string representation of an object
    item_details(self):
    """

    def __init__(
        self, item_name, item_category, item_quantity, item_current_status, item_price
    ):
        """
        This method instantiates class attributes as a constructor

        :param item_name: Name of the Item
        :param item_category: Category that item belongs to
        :param item_quantity: Number of items to be bought
        :param item_current_status: Current status of item at home
        :param item_price: Price of each item for individual person

        """
        self.item_name = item_name
        self.item_category = item_category
        self.item_quantity = item_quantity
        self.__item_current_status = item_current_status
        self.__item_price = item_price

    def __get_item_price(self):
        """
        This is a private method used to calculate price by each person
        sharing the apartment. In this case it's between 3 people.
        :return: It returns the price of item by individual, sharing 3. With
        a round approximation to 2 decimal place
        """
        return round(self.__item_price / 3.0, 2)  # Round approx. 2 decimal

    def get_current_st(self):
        """
        This method fetches the current status of item initiated.
        :return: returns the private attribute of current status of item
        """
        return self.__item_current_status

    def set_current_st(self, current_status):
        """
        This method changes the current status of item initiated and changes that.
        :param current_status: variable passed by user to update status of
        item already initiated
        :return: This returns the updated status of item initiated
        """
        self.__item_current_status = current_status
        return self.__item_current_status

    def _repr_(self):
        """
        This is a default method, To compute the “official” string
        representation of an object
        :return: It returns the object initiated with all attributes in
        string format.
        """
        return (
            self.item_name
            + " "
            + self.item_category
            + " "
            + str(self.item_quantity)
            + " "
            + self.__item_current_status
            + " "
            + str(self.__get_item_price())
        )

    def item_details(self):
        """
        This method takes in all attributes and addresses them in a
        dictionary format.
        :return: This returns dictionary with attributes names as "keys" and
        attributes values as "values"
        """
        return {
            "item_name": self.item_name,
            "item_category": self.item_category,
            "item_quantity": self.item_quantity,
            "item_status": self.__item_current_status,
            "item_price": self.__get_item_price(),
        }


class TestStringMethods(unittest.TestCase):
    def setUp(self):
        # Unit Tests using asserts
        item_tuple = ("Apple", "Produce", 12, "Partially Finished", 5.59)
        self.grocery_item1 = GroceryListItem(*(item_tuple))

    def test_for_repr_(self):
        # Test for _repr_()
        assert (
            self.grocery_item1._repr_() == "Apple Produce 12 Partially " "Finished 1.86"
        ), "Incorrect Value"

    def test_item_details(self):
        # Test for item_details() method
        assert self.grocery_item1.item_details() == {
            "item_name": "Apple",
            "item_category": "Produce",
            "item_quantity": 12,
            "item_status": "Partially Finished",
            "item_price": 1.86,
        }, "Incorrect Value"

    def test_get_current_st(self):
        # Test for get_current_st()
        assert (
            self.grocery_item1.get_current_st() == "Partially Finished"
        ), "Incorrect Value"

    def test_set_current_st(self):
        # Test for set_current_st()
        assert (
            self.grocery_item1.set_current_st("Completely Finished")
            == "Completely Finished"
        ), "Incorrect Value"


if __name__ == "__main__":  # Main function to run this file directly
    unittest.main()
